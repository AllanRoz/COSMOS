import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

const EARTH_TEXTURE = 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg';

const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;

const Globe = () => {
  const globeRef = useRef();
  const texture = useTexture(EARTH_TEXTURE);
  texture.colorSpace = 'srgb';

  const segments = isMobile() ? 32 : 64;

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group>
      <mesh ref={globeRef}>
        <sphereGeometry args={[10, segments, segments]} />
        <meshStandardMaterial map={texture} metalness={0.1} roughness={0.8} />
      </mesh>
    </group>
  );
};

export default Globe;
