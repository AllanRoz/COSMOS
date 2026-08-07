import React, { useState } from 'react';
import Scene from '../components/three/Scene';
import { PLANET_DATA } from '../constants/planetData';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

const SolarSystem = () => {
  const [selectedPlanetId, setSelectedPlanetId] = useState(null);
  const { isFavorite, toggleFavorite } = useFavorites();

  const selectedPlanet = selectedPlanetId ? PLANET_DATA[selectedPlanetId] : null;

  return (
    <div className="relative w-full h-screen bg-cosmos-black overflow-hidden">
      <div className="relative z-10 pointer-events-none">
        {/* Title - Top Left */}
        <div className="absolute top-8 left-8">
          <h1 className="text-4xl font-bold tracking-tighter text-white">SOLAR SYSTEM</h1>
          <p className="text-white/40">Interactive 3D Visualization</p>
        </div>

        {/* Planet Selector - Top Center-Right */}
        <div className="absolute top-8 left-[300px] flex flex-col gap-2">
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

        {/* Simulation Controls - Bottom Right */}
        <div className="absolute bottom-8 right-8">
          <div className="bg-cosmos-slate/80 p-4 rounded-xl border border-white/10 backdrop-blur-md">
            <p className="text-xs text-white/40 uppercase mb-3">Simulation</p>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('toggleSim'))} 
                className="p-2 bg-cosmos-accent text-cosmos-black rounded hover:bg-white transition-colors"
              >
                <span className="text-xs font-bold">Sim Control</span>
              </button>
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/60">Speed</span>
                <input 
                  type="range" 
                  min="0" 
                  max="5" 
                  step="0.1" 
                  className="w-24"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Scene */}
      <div className="w-full h-full">
        <Scene onPlanetSelect={(id) => setSelectedPlanetId(id)} />
      </div>

      {/* Planet Info Panel */}
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
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-5xl font-bold mb-2">{selectedPlanet.name}</h2>
                    <p className="text-cosmos-accent font-medium uppercase tracking-widest text-sm">Planetary Profile</p>
                  </div>
                  <button 
                    onClick={() => toggleFavorite(selectedPlanetId)}
                    className={`p-3 rounded-full transition-colors ${isFavorite(selectedPlanetId) ? 'bg-cosmos-accent text-cosmos-black' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
                  >
                    <Heart size={24} fill={isFavorite(selectedPlanetId) ? "currentColor" : "none"} />
                  </button>
                </div>

                <p className="text-white/70 leading-relaxed">{selectedPlanet.description}</p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-white/40">Diameter</p>
                    <p className="text-xl font-bold">{selectedPlanet.stats.diameter}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/40">Mass</p>
                    <p className="text-xl font-bold">{selectedPlanet.stats.mass}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/40">Gravity</p>
                    <p className="text-xl font-bold">{selectedPlanet.stats.gravity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/40">Temperature</p>
                    <p className="text-xl font-bold">{selectedPlanet.stats.temperature}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/40">Orbital Period</p>
                    <p className="text-xl font-bold">{selectedPlanet.stats.orbitalPeriod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/40">Rotation Period</p>
                    <p className="text-xl font-bold">{selectedPlanet.stats.rotationPeriod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/40">Moons</p>
                    <p className="text-xl font-bold">{selectedPlanet.stats.moons}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/40">Atmosphere</p>
                    <p className="text-xl font-bold">{selectedPlanet.stats.atmosphere}</p>
                  </div>
                </div>

                <button 
                  className="w-full py-4 bg-cosmos-accent text-cosmos-black font-bold rounded-lg hover:bg-white transition-colors"
                  onClick={() => console.log('Compare logic here')}
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
