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
      <div className="absolute top-4 left-4 z-10 flex gap-4">
        <div className="bg-cosmos-slate/80 p-3 rounded-lg border border-white/10 backdrop-blur-md">
          <p className="text-xs text-white/40 uppercase mb-2">Simulation</p>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setPaused(!paused)}
              className="p-2 bg-cosmos-accent text-cosmos-black rounded hover:bg-white transition-colors"
              aria-label={paused ? "Play simulation" : "Pause simulation"}
            >
              {paused ? 'Play' : 'Pause'}
            </button>
            <input 
              type="range" 
              min="0" 
              max="5" 
              step="0.1" 
              value={simSpeed} 
              onChange={(e) => setSimSpeed(parseFloat(e.target.value))}
              className="w-24"
              aria-label="Simulation speed"
            />
            <span className="text-sm font-bold">{simSpeed.toFixed(1)}x</span>
          </div>
        </div>
      </div>
      
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
