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

  const positions = useMemo(() => new Float32Array(points.flatMap(p => [p.x, p.y, p.z])), [points]);

  const geometry = useMemo(() => new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(positions, 3)), [positions]);
  const material = useMemo(() => new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.2 }), [color]);

  return (
    <lineSegments geometry={geometry} material={material} />
  );
};

export default OrbitLine;
