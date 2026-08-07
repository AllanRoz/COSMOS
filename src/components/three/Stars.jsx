import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';

const Stars = () => {
  const pointsRef = useRef();

  const [particles] = useMemo(() => {
    const count = 5000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;
    }
    return [positions];
  }, []);

  return (
    <points ref={pointsRef} positions={particles[0]}>
      <pointsMaterial
        transparent
        color="#ffffff"
        size={0.7}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
};

export default Stars;
