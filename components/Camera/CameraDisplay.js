import React from 'react';

export const CameraDisplay = ({ rotation, zoom }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '10px',
        borderRadius: '8px',
      }}
    >
      <p>Rotation (Degrees):</p>
      <p>X: {rotation.x.toFixed(2)}</p>
      <p>Y: {rotation.y.toFixed(2)}</p>
      <p>Z: {rotation.z.toFixed(2)}</p>
      <p>Zoom: {zoom.toFixed(2)}%</p>
    </div>
  );
};
