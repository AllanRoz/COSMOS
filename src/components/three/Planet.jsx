import React, { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import OrbitLine from './OrbitLine';
import { PLANET_DATA } from '../../constants/planetData';

const Planet = ({ planetId, onClick, speed = 1, paused = false, mobile = false }) => {
  const planet = PLANET_DATA[planetId];
  const ref = React.useRef();

  const segments = mobile ? 16 : 32;

  const geometry = useMemo(
    () => new THREE.SphereGeometry(planet.size, segments, segments),
    [planet.size, segments]
  );

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: planet.color,
        roughness: 0.7,
        metalness: 0.3,
      }),
    [planet.color]
  );

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
        onPointerDown={(e) => e.stopPropagation()}
        geometry={geometry}
        material={material}
      >
        {/*
          Html labels are shown only on desktop AND only when the planet
          is far enough from the camera (distanceFactor keeps the label
          from being huge when zoomed in). The key fix: occlude={[]} tells
          R3F's Html to hide the label when its 3D anchor is behind other
          geometry, and zIndexRange keeps labels below our React UI overlay
          (which sits in z-index 10+).
        */}
        {!mobile && (
          <Html
            distanceFactor={20}
            zIndexRange={[0, 5]}
            style={{ pointerEvents: 'none', userSelect: 'none' }}
          >
            <div
              style={{
                background: 'rgba(15,23,42,0.85)',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '2px 6px',
                borderRadius: '4px',
                fontSize: '10px',
                whiteSpace: 'nowrap',
                color: 'rgba(255,255,255,0.7)',
                pointerEvents: 'none',
              }}
            >
              {planet.name}
            </div>
          </Html>
        )}
      </mesh>
    </group>
  );
};

export default Planet;
