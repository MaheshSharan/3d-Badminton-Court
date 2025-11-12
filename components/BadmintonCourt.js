'use client';
import React from 'react';
import { Box, Plane, Text } from '@react-three/drei';
import { COURT_DIMENSIONS, COURT_COLORS } from './constants/courtDimensions';
import { config } from '../lib/config';

const BadmintonCourt = () => {
  const borderOffset = COURT_DIMENSIONS.BORDER_OFFSET;
  const showAxis = config.showAxis;

  const createLine = (x1, z1, x2, z2, width = COURT_DIMENSIONS.LINE_WIDTH, label = "", isDotted = false) => {
    const length = Math.sqrt((x2 - x1) ** 2 + (z2 - z1) ** 2);
    const posX = (x1 + x2) / 2;
    const posZ = (z1 + z2) / 2;
    const rotY = Math.atan2(z2 - z1, x2 - x1);

    const lineGeometry = isDotted ? (
      <group>
        {[...Array(20)].map((_, index) => (
          <Box
            key={index}
            args={[length / 40, 0.005, width]}
            position={[
              posX + (length / 20) * (index - 9.5) * Math.cos(rotY),
              0.002,
              posZ + (length / 20) * (index - 9.5) * Math.sin(rotY)
            ]}
            rotation-y={rotY}
          >
            <meshStandardMaterial color={COURT_COLORS.LINE_WHITE} />
          </Box>
        ))}
      </group>
    ) : (
      <Box args={[length, 0.005, width]} position={[posX, 0.002, posZ]} rotation-y={rotY}>
        <meshStandardMaterial color={COURT_COLORS.LINE_WHITE} />
      </Box>
    );

    return (
      <group>
        {lineGeometry}
        {label && (
          <Text
            position={[posX, 0.05, posZ]}
            rotation={[-Math.PI / 2, 0, rotY]}
            fontSize={0.15}
            color="black"
            anchorX="center"
            anchorY="middle"
          >
            {label}
          </Text>
        )}
      </group>
    );
  };

  const createServiceCourt = (x, z, label) => {
    return (
      <group>
        <Plane 
          args={[COURT_DIMENSIONS.SERVICE_COURT_LENGTH, COURT_DIMENSIONS.SERVICE_COURT_WIDTH]} 
          rotation-x={-Math.PI / 2} 
          position={[x, 0.0015, z]}
        >
          <meshStandardMaterial color={COURT_COLORS.COURT_GREEN} transparent opacity={0.3} />
        </Plane>
        <Text
          position={[x, 0.05, z]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.2}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      </group>
    );
  };

  return (
    <group>
      {/* Wooden border */}
      <Plane args={[COURT_DIMENSIONS.TOTAL_LENGTH + 0.4, COURT_DIMENSIONS.TOTAL_WIDTH + 0.4]} rotation-x={-Math.PI / 2} position-y={0}>
        <meshStandardMaterial color={COURT_COLORS.WOOD_BORDER} />
      </Plane>

      {/* Main court floor */}
      <Plane args={[COURT_DIMENSIONS.TOTAL_LENGTH, COURT_DIMENSIONS.TOTAL_WIDTH]} rotation-x={-Math.PI / 2} position-y={0.001}>
        <meshStandardMaterial color={COURT_COLORS.COURT_GREEN} />
      </Plane>

      {/* White border around the green court (offset inwards) - THESE ARE ALSO THE LONG SERVICE LINES FOR SINGLE */}
      <Plane args={[COURT_DIMENSIONS.TOTAL_LENGTH - 2 * borderOffset, COURT_DIMENSIONS.LINE_WIDTH]} rotation-x={-Math.PI / 2} position-y={0.002} position-z={COURT_DIMENSIONS.SIDELINE_DOUBLES - borderOffset}>
        <meshStandardMaterial color={COURT_COLORS.LINE_WHITE} />
      </Plane>
      <Text position={[0, 0.05, COURT_DIMENSIONS.SIDELINE_DOUBLES - borderOffset]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.15} color="black" anchorX="center" anchorY="middle">
        Sideline for Doubles
      </Text>
      <Plane args={[COURT_DIMENSIONS.TOTAL_LENGTH - 2 * borderOffset, COURT_DIMENSIONS.LINE_WIDTH]} rotation-x={-Math.PI / 2} position-y={0.002} position-z={-COURT_DIMENSIONS.SIDELINE_DOUBLES + borderOffset}>
        <meshStandardMaterial color={COURT_COLORS.LINE_WHITE} />
      </Plane>
      <Text position={[0, 0.05, -COURT_DIMENSIONS.SIDELINE_DOUBLES + borderOffset]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.15} color="black" anchorX="center" anchorY="middle">
        Sideline for Doubles
      </Text>
      <Plane args={[COURT_DIMENSIONS.LINE_WIDTH, COURT_DIMENSIONS.TOTAL_WIDTH - 2 * borderOffset]} rotation-x={-Math.PI / 2} position-y={0.002} position-x={-COURT_DIMENSIONS.LONG_SERVICE_LINE_SINGLES + borderOffset}>
        <meshStandardMaterial color={COURT_COLORS.LINE_WHITE} />
      </Plane>
      <Text position={[-COURT_DIMENSIONS.LONG_SERVICE_LINE_SINGLES + borderOffset, 0.05, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} fontSize={0.15} color="black" anchorX="center" anchorY="middle">
        Long Service Line for Single
      </Text>
      <Plane args={[COURT_DIMENSIONS.LINE_WIDTH, COURT_DIMENSIONS.TOTAL_WIDTH - 2 * borderOffset]} rotation-x={-Math.PI / 2} position-y={0.002} position-x={COURT_DIMENSIONS.LONG_SERVICE_LINE_SINGLES - borderOffset}>
        <meshStandardMaterial color={COURT_COLORS.LINE_WHITE} />
      </Plane>
      <Text position={[COURT_DIMENSIONS.LONG_SERVICE_LINE_SINGLES - borderOffset, 0.05, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} fontSize={0.15} color="black" anchorX="center" anchorY="middle">
        Long Service Line for Single
      </Text>

      {/* Net Line (Horizontal center line (X-axis) )*/}
      {createLine(0, COURT_DIMENSIONS.SIDELINE_DOUBLES - borderOffset, 0, -COURT_DIMENSIONS.SIDELINE_DOUBLES + borderOffset, COURT_DIMENSIONS.LINE_WIDTH, "Horizontal center line", true)}

      {/* Vertical center line (Z-axis) - Split into two from short service line */}
      {createLine(-COURT_DIMENSIONS.LONG_SERVICE_LINE_SINGLES + borderOffset, 0, -COURT_DIMENSIONS.SHORT_SERVICE_LINE, 0, COURT_DIMENSIONS.LINE_WIDTH, "Vertical center line", false)}
      {createLine(COURT_DIMENSIONS.SHORT_SERVICE_LINE, 0, COURT_DIMENSIONS.LONG_SERVICE_LINE_SINGLES - borderOffset, 0, COURT_DIMENSIONS.LINE_WIDTH, "Vertical center line", false)}

      {createLine(-COURT_DIMENSIONS.LONG_SERVICE_LINE_DOUBLES, COURT_DIMENSIONS.SIDELINE_DOUBLES - borderOffset, -COURT_DIMENSIONS.LONG_SERVICE_LINE_DOUBLES, -COURT_DIMENSIONS.SIDELINE_DOUBLES + borderOffset, COURT_DIMENSIONS.LINE_WIDTH, "Long Service Line for Double", false)}
      {createLine(COURT_DIMENSIONS.LONG_SERVICE_LINE_DOUBLES, COURT_DIMENSIONS.SIDELINE_DOUBLES - borderOffset, COURT_DIMENSIONS.LONG_SERVICE_LINE_DOUBLES, -COURT_DIMENSIONS.SIDELINE_DOUBLES + borderOffset, COURT_DIMENSIONS.LINE_WIDTH, "Long Service Line for Double", false)}

      {/* Sideline for Single (corrected offset) */}
      {createLine(-COURT_DIMENSIONS.LONG_SERVICE_LINE_SINGLES + borderOffset, COURT_DIMENSIONS.SIDELINE_SINGLES, COURT_DIMENSIONS.LONG_SERVICE_LINE_SINGLES - borderOffset, COURT_DIMENSIONS.SIDELINE_SINGLES, COURT_DIMENSIONS.LINE_WIDTH, "Sideline for Single", false)}
      {createLine(-COURT_DIMENSIONS.LONG_SERVICE_LINE_SINGLES + borderOffset, -COURT_DIMENSIONS.SIDELINE_SINGLES, COURT_DIMENSIONS.LONG_SERVICE_LINE_SINGLES - borderOffset, -COURT_DIMENSIONS.SIDELINE_SINGLES, COURT_DIMENSIONS.LINE_WIDTH, "Sideline for Single", false)}

      {/* Short Service Line (with offset) */}
      {createLine(-COURT_DIMENSIONS.SHORT_SERVICE_LINE, COURT_DIMENSIONS.SIDELINE_DOUBLES - borderOffset, -COURT_DIMENSIONS.SHORT_SERVICE_LINE, -COURT_DIMENSIONS.SIDELINE_DOUBLES + borderOffset, COURT_DIMENSIONS.LINE_WIDTH, "Short Service Line", false)}
      {createLine(COURT_DIMENSIONS.SHORT_SERVICE_LINE, COURT_DIMENSIONS.SIDELINE_DOUBLES - borderOffset, COURT_DIMENSIONS.SHORT_SERVICE_LINE, -COURT_DIMENSIONS.SIDELINE_DOUBLES + borderOffset, COURT_DIMENSIONS.LINE_WIDTH, "Short Service Line", false)}

      {/* Service Courts */}
      {createServiceCourt(-COURT_DIMENSIONS.SERVICE_COURT_LENGTH, COURT_DIMENSIONS.SERVICE_COURT_WIDTH / 2, "Left Service Court")}
      {createServiceCourt(COURT_DIMENSIONS.SERVICE_COURT_LENGTH, COURT_DIMENSIONS.SERVICE_COURT_WIDTH / 2, "Right Service Court")}
      {createServiceCourt(-COURT_DIMENSIONS.SERVICE_COURT_LENGTH, -COURT_DIMENSIONS.SERVICE_COURT_WIDTH / 2, "Right Service Court")}
      {createServiceCourt(COURT_DIMENSIONS.SERVICE_COURT_LENGTH, -COURT_DIMENSIONS.SERVICE_COURT_WIDTH / 2, "Left Service Court")}

      {/* Axis Markers - Controlled by environment variable */}
      {showAxis && (
        <>
          {/* X-Axis Marker */}
          <Box args={[0.1, 0.1, 1]} position={[0, 0.05, 2.75]}>
            <meshStandardMaterial color="red" />
          </Box>
          <Text position={[0, 0.2, 2.75]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.2} color="black" anchorX="center" anchorY="middle">
            X-Axis
          </Text>

          {/* Z-Axis Marker */}
          <Box args={[1, 0.1, 0.1]} position={[5.90, 0.05, 0]}>
            <meshStandardMaterial color="blue" />
          </Box>
          <Text position={[5.90, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.2} color="black" anchorX="center" anchorY="middle">
            Z-Axis
          </Text>

          {/* Y-Axis Marker */}
          <Box args={[0.1, 1, 0.1]} position={[0, 0.5, 0]}>
            <meshStandardMaterial color="green" />
          </Box>
          <Text position={[0, 1.1, 0]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.2} color="black" anchorX="center" anchorY="middle">
            Y-Axis
          </Text>
        </>
      )}
    </group>
  );
};

export default BadmintonCourt;