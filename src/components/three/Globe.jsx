import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

const EARTH_TEXTURE = 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg';

const Globe = () => {
  const globeRef = useRef();
  const texture = useTexture(EARTH_TEXTURE);
  texture.colorSpace = 'srgb';

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
          map={texture}
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>
    </group>
  );
};

export default Globe;
