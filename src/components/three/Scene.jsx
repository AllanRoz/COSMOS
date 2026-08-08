import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Sun from './Sun';
import Planet from './Planet';
import Stars from './Stars';
import { PLANET_DATA } from '../../constants/planetData';

const Scene = ({ onPlanetSelect, simSpeed = 1, paused = false }) => {
  return (
    <div className="relative w-full h-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 50, 100]} fov={45} />
        <OrbitControls 
          makeDefault 
          dampingFactor={0.05}
          enablePan={false}
          maxDistance={200}
          minDistance={20}
        />
        
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 0, 0]} intensity={2.5} color="#ffcc00" castShadow={false} />
        
        <Stars />
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
            />
          ))}
      </Canvas>
    </div>
  );
};

export default Scene;
