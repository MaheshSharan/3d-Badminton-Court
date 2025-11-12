'use client';

import React from 'react';
import { Box, Cylinder } from '@react-three/drei';
import { COURT_DIMENSIONS, COURT_COLORS } from './constants/courtDimensions';

const BadmintonNet = () => {
  const netWidth = COURT_DIMENSIONS.TOTAL_WIDTH;
  const netHeight = COURT_DIMENSIONS.NET_MESH_HEIGHT;
  const gridSize = COURT_DIMENSIONS.NET_GRID_SIZE;
  const lineThickness = COURT_DIMENSIONS.NET_LINE_THICKNESS;
  const tapeThickness = COURT_DIMENSIONS.NET_TAPE_THICKNESS;
  const tapeWidth = COURT_DIMENSIONS.NET_TAPE_WIDTH;

  // Calculate pole positions
  const poleZPosition = netWidth / 2 + tapeThickness / 2;

  // Calculate the required pole height
  const poleHeight = COURT_DIMENSIONS.NET_HEIGHT + netHeight / 2 + tapeWidth / 2;

  const gridLines = [];
  // Vertical lines along Z-axis
  for (let i = -netWidth / 2 + lineThickness; i <= netWidth / 2 - lineThickness; i += gridSize) {
    gridLines.push(
      <Box key={`vertical-${i}`} args={[lineThickness, netHeight, lineThickness]} position={[0, COURT_DIMENSIONS.NET_HEIGHT, i]}>
        <meshStandardMaterial color={COURT_COLORS.NET_BLACK} />
      </Box>
    );
  }
  // Horizontal lines along Z-axis
  for (let i = -netHeight / 2 + lineThickness; i <= netHeight / 2 - lineThickness; i += gridSize) {
    gridLines.push(
      <Box key={`horizontal-${i}`} args={[lineThickness, lineThickness, netWidth - 2 * lineThickness]} position={[0, COURT_DIMENSIONS.NET_HEIGHT + i, 0]}>
        <meshStandardMaterial color={COURT_COLORS.NET_BLACK} />
      </Box>
    );
  }

  return (
    <group>
      {/* Net posts */}
      <Cylinder args={[COURT_DIMENSIONS.NET_POST_RADIUS, COURT_DIMENSIONS.NET_POST_RADIUS, poleHeight]} position={[0, poleHeight / 2, -poleZPosition]}>
        <meshStandardMaterial color={COURT_COLORS.NET_POST_YELLOW} />
      </Cylinder>
      <Cylinder args={[COURT_DIMENSIONS.NET_POST_RADIUS, COURT_DIMENSIONS.NET_POST_RADIUS, poleHeight]} position={[0, poleHeight / 2, poleZPosition]}>
        <meshStandardMaterial color={COURT_COLORS.NET_POST_YELLOW} />
      </Cylinder>

      {/* Meshed net with grid lines */}
      <group position={[0, 0, 0]}>
        {gridLines}
      </group>

      {/* White tape on top of net */}
      <Box args={[tapeThickness, tapeWidth, netWidth]} position={[0, COURT_DIMENSIONS.NET_HEIGHT + netHeight / 2 + tapeWidth / 2, 0]}>
        <meshStandardMaterial color={COURT_COLORS.LINE_WHITE} />
      </Box>

      {/* White tape on bottom of net */}
      <Box args={[tapeThickness, tapeWidth, netWidth]} position={[0, COURT_DIMENSIONS.NET_HEIGHT - netHeight / 2 - tapeWidth / 2, 0]}>
        <meshStandardMaterial color={COURT_COLORS.LINE_WHITE} />
      </Box>
    </group>
  );
};

export default BadmintonNet;