import React from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import OrbitLine from './OrbitLine';
import { PLANET_DATA } from '../../constants/planetData';

const Planet = ({ planetId, onClick, speed = 1, paused = false }) => {
  const planet = PLANET_DATA[planetId];
  const ref = React.useRef();

  useFrame((state) => {
    if (ref.current && !paused) {
      const t = state.clock.getElapsedTime();
      ref.current.position.x = Math.cos(t * planet.speed * speed) * planet.distance;
      ref.current.position.z = Math.sin(t * planet.speed * speed) * planet.distance;
      ref.current.rotation.y += 0.01 * speed;
    }
  });

  return (
    <group>
      <OrbitLine distance={planet.distance} color="#ffffff" />
      <mesh 
        ref={ref} 
        onClick={(e) => {
          e.stopPropagation();
          onClick(planetId);
        }}
      >
        <sphereGeometry args={[planet.size, 32, 32]} />
        <meshStandardMaterial color={planet.color} roughness={0.7} metalness={0.3} />
        {planetId !== 'sun' && (
          <Html distanceFactor={20}>
            <div className="bg-cosmos-slate border border-white/10 p-2 rounded text-[10px] whitespace-nowrap">
              {planet.name}
            </div>
          </Html>
        )}
      </mesh>
    </group>
  );
};

export default Planet;
