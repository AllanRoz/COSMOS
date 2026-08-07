import React, { useState } from 'react';
import Scene from '../components/three/Scene';
import { PLANET_DATA } from '../constants/planetData';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, ArrowLeft } from 'lucide-react';

const SolarSystem = () => {
  const [selectedPlanetId, setSelectedPlanetId] = useState(null);

  const selectedPlanet = selectedPlanetId ? PLANET_DATA[selectedPlanetId] : null;

  return (
    <div className="relative w-full h-screen bg-cosmos-black overflow-hidden">
      <div className="absolute top-8 left-8 z-10">
        <h1 className="text-4xl font-bold tracking-tighter text-white">SOLAR SYSTEM</h1>
        <p className="text-white/40">Interactive 3D Visualization</p>
      </div>

      <div className="absolute top-8 right-8 z-10 flex flex-col gap-2">
        {Object.keys(PLANET_DATA).map((id) => (
          <button
            key={id}
            onClick={() => setSelectedPlanetId(id)}
            className={`px-3 py-1 rounded-full border text-xs transition-all ${
              selectedPlanetId === id 
              ? 'bg-cosmos-accent text-cosmos-black border-cosmos-accent' 
              : 'border-white/10 hover:border-white/30 text-white/60'
            }`}
          >
            {PLANET_DATA[id].name}
          </button>
        ))}
      </div>

      <div className="w-full h-full">
        <Scene onPlanetSelect={(id) => setSelectedPlanetId(id)} />
      </div>

      <AnimatePresence>
        {selectedPlanetId && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="absolute right-0 top-0 h-full w-full md:w-[450px] bg-cosmos-slate border-l border-white/10 z-20 p-8 shadow-2xl overflow-y-auto"
          >
            <button 
              onClick={() => setSelectedPlanetId(null)}
              className="mb-8 p-2 rounded-full bg-white/5 hover:bg-white/10"
            >
              <ArrowLeft size={20} />
            </button>

            {selectedPlanet && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-5xl font-bold mb-2">{selectedPlanet.name}</h2>
                  <p className="text-cosmos-accent font-medium uppercase tracking-widest text-sm">Planetary Profile</p>
                </div>

                <p className="text-white/70 leading-relaxed">{selectedPlanet.description}</p>

                <div className="grid grid-cols-2 gap-4 py-6 border-y border-white/5">
                  <div>
                    <p className="text-xs text-white/40 uppercase mb-1">Diameter</p>
                    <p className="font-bold">{selectedPlanet.stats.diameter}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase mb-1">Mass</p>
                    <p className="font-bold">{selectedPlanet.stats.mass}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase mb-1">Gravity</p>
                    <p className="font-bold">{selectedPlanet.stats.gravity}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase mb-1">Temperature</p>
                    <p className="font-bold">{selectedPlanet.stats.temperature}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase mb-1">Orbital Period</p>
                    <p className="font-bold">{selectedPlanet.stats.orbitalPeriod}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase mb-1">Rotation Period</p>
                    <p className="font-bold">{selectedPlanet.stats.rotationPeriod}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase mb-1">Moons</p>
                    <p className="font-bold">{selectedPlanet.stats.moons}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase mb-1">Atmosphere</p>
                    <p className="font-bold">{selectedPlanet.stats.atmosphere}</p>
                  </div>
                </div>

                <button 
                  className="w-full py-4 bg-cosmos-accent text-cosmos-black font-bold rounded-lg hover:bg-white transition-colors"
                  onClick={() => console.log('Comparison logic here')}
                >
                  COMPARE PLANETS
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SolarSystem;
