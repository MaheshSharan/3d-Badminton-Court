'use client';
import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraControls } from './Camera/CameraControls';
import { CameraDisplay } from './Camera/CameraDisplay';
import BadmintonCourt from './BadmintonCourt';
import BadmintonNet from './BadmintonNet';
import { LIGHTING } from './constants/courtDimensions';

const Scene = () => {
  const cameraRef = useRef();
  const controlsRef = useRef();
  const [rotation, setRotation] = useState({ x: -87.92, y: -65.50, z: -87.72 });
  const [zoom, setZoom] = useState(79.71);

  return (
    <>
      <CameraDisplay rotation={rotation} zoom={zoom} />
      <Canvas>
        <CameraControls
          cameraRef={cameraRef}
          controlsRef={controlsRef}
          setRotation={setRotation}
          setZoom={setZoom}
        />
        <ambientLight intensity={LIGHTING.AMBIENT_INTENSITY} />
        <directionalLight position={LIGHTING.DIRECTIONAL_POSITION} intensity={LIGHTING.DIRECTIONAL_INTENSITY} />
        <BadmintonCourt />
        <BadmintonNet />
      </Canvas>
    </>
  );
};

export default Scene;
