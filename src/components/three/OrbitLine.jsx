import React, { useMemo } from 'react';
import * as THREE from 'three';

const OrbitLine = ({ distance, color = "#ffffff" }) => {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * distance, 0, Math.sin(angle) * distance));
    }
    return pts;
  }, [distance]);

  const positions = new Float32Array(points.flatMap(p => [p.x, p.y, p.z]));

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes|position"
          count={points.length}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={0.2} />
    </lineSegments>
  );
};

export default OrbitLine;
