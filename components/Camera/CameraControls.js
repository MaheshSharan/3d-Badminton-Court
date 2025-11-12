import React, { useRef, useEffect, useState } from 'react';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { CAMERA_DEFAULTS } from '../constants/courtDimensions';

export const CameraControls = ({ cameraRef, controlsRef, setRotation, setZoom }) => {
  const [isPanning, setIsPanning] = useState(false);

  useEffect(() => {
    const updateCameraState = () => {
      if (cameraRef.current) {
        const { rotation, position } = cameraRef.current;
        const distance = position.length(); // Calculate distance from the origin

        setRotation({
          x: (rotation.x * 180) / Math.PI,
          y: (rotation.y * 180) / Math.PI,
          z: (rotation.z * 180) / Math.PI,
        });

        const zoomPercentage = ((50 - distance) / (50 - 5)) * 100;
        setZoom(zoomPercentage);
      }
    };

    const interval = setInterval(updateCameraState, 100);
    return () => clearInterval(interval);
  }, [cameraRef, setRotation, setZoom]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === ' ') {
        setIsPanning(true);
        controlsRef.current.enablePan = true;
        document.body.style.cursor = 'grab';
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === ' ') {
        setIsPanning(false);
        controlsRef.current.enablePan = false;
        document.body.style.cursor = 'default';
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [controlsRef]);

  return (
    <>
      <PerspectiveCamera makeDefault ref={cameraRef} position={CAMERA_DEFAULTS.POSITION} fov={CAMERA_DEFAULTS.FOV} />
      <OrbitControls
        ref={controlsRef}
        camera={cameraRef.current}
        enableZoom={true}
        enablePan={isPanning}
        enableRotate={true}
        zoomSpeed={CAMERA_DEFAULTS.ZOOM_SPEED}
        panSpeed={CAMERA_DEFAULTS.PAN_SPEED}
        rotateSpeed={CAMERA_DEFAULTS.ROTATE_SPEED}
        minDistance={CAMERA_DEFAULTS.MIN_DISTANCE}
        maxDistance={CAMERA_DEFAULTS.MAX_DISTANCE}
        target={[0, 0, 0]}
      />
    </>
  );
};
