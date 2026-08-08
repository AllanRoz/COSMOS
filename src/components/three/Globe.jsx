import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Globe = () => {
  const globeRef = useRef();

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group>
      <mesh ref={globeRef}>
        <sphereGeometry args={[10, 64, 64]} />
        <meshStandardMaterial 
          color="#1e293b" 
          wireframe 
          transparent 
          opacity={0.35} 
          metalness={0.4}
          roughness={0.6}
        />
      </mesh>
    </group>
  );
};

export default Globe;
