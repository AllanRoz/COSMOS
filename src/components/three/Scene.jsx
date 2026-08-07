import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Sun from './Sun';
import Planet from './Planet';
import Stars from './Stars';
import { PLANET_DATA } from '../../constants/planetData';

const Scene = ({ onPlanetSelect }) => {
  const [simSpeed, setSimSpeed] = useState(1);
  const [paused, setPaused] = useState(false);

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

        <Suspense fallback={null}>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;
