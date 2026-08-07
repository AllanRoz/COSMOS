import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

const Globe = () => {
  const globeRef = useRef();

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={globeRef}>
      <sphereGeometry args={[10, 64, 64]} />
      <meshStandardMaterial 
        color="#2271b3" 
        wireframe 
        transparent 
        opacity={0.3} 
        metalness={0.8}
        roughness={0.2}
      />
      <meshStandardMaterial 
        color="#1e293b" 
        transparent 
        opacity={0.8}
        metalness={0.5}
        roughness={0.5}
      />
    </mesh>
  );
};

export default Globe;
