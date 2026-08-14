import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Sun from './Sun';
import Planet from './Planet';
import Stars from './Stars';
import { PLANET_DATA } from '../../constants/planetData';

const isMobileDevice = () =>
  typeof window !== 'undefined' && window.innerWidth < 768;

const Scene = ({ onPlanetSelect, simSpeed = 1, paused = false }) => {
  const mobile = isMobileDevice();

  return (
    <div className="relative w-full h-full">
      <Canvas
        // Limit pixel ratio on mobile to save GPU
        dpr={mobile ? [1, 1.5] : [1, 2]}
        gl={{ antialias: !mobile, powerPreference: 'high-performance' }}
      >
        <PerspectiveCamera makeDefault position={[0, 50, 100]} fov={mobile ? 55 : 45} />
        <OrbitControls
          makeDefault
          dampingFactor={0.05}
          enablePan={false}
          maxDistance={200}
          minDistance={mobile ? 30 : 20}
          // Touch is enabled by default in OrbitControls
          touches={{
            ONE: 2,   // TOUCH.ROTATE
            TWO: 512, // TOUCH.DOLLY_PAN
          }}
        />

        <ambientLight intensity={0.3} />
        <pointLight position={[0, 0, 0]} intensity={2.5} color="#ffcc00" castShadow={false} />

        <Stars mobile={mobile} />
        <Sun />

        {Object.keys(PLANET_DATA)
          .filter(key => key !== 'sun')
          .map((key) => (
            <Planet
              key={key}
              planetId={key}
              onClick={(id) => onPlanetSelect(id)}
              speed={simSpeed}
              paused={paused}
              mobile={mobile}
            />
          ))}
      </Canvas>
    </div>
  );
};

export default Scene;
