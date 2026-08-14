import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';

const Stars = ({ mobile = false }) => {
  const pointsRef = useRef();
  const count = mobile ? 2000 : 5000;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 2000;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 2000;
    }
    return arr;
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  const material = useMemo(() =>
    new THREE.PointsMaterial({
      transparent: true,
      color: '#ffffff',
      size: 0.7,
      sizeAttenuation: true,
      depthWrite: false,
    }),
  []);

  return <points ref={pointsRef} geometry={geometry} material={material} />;
};

export default Stars;
