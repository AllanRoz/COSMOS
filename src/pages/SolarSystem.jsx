import React, { useState } from 'react';
import Scene from '../components/three/Scene';
import { PLANET_DATA } from '../constants/planetData';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Heart, Ruler, Play, Pause } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

const SolarSystem = () => {
  const [selectedPlanetId, setSelectedPlanetId] = useState(null);
  const [compareMode, setCompareMode] = useState(false);
  const [compareIds, setCompareIds] = useState([]);
  const [simSpeed, setSimSpeed] = useState(1);
  const [paused, setPaused] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  const selectedPlanet = selectedPlanetId ? PLANET_DATA[selectedPlanetId] : null;

  const toggleCompare = (id) => {
    if (compareMode) {
      if (compareIds.includes(id)) {
        setCompareIds(compareIds.filter(i => i !== id));
      } else if (compareIds.length < 2) {
        setCompareIds([...compareIds, id]);
      }
    } else {
      setCompareIds([id]);
    }
  };

  const handlePlanetSelect = (id) => {
    if (compareMode) {
      toggleCompare(id);
    } else {
      setSelectedPlanetId(id);
    }
  };

  return (
    <div className="relative w-full h-screen bg-cosmos-black overflow-hidden">
      {/* Header Section */}
      <div className="absolute top-8 left-8 z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-5xl font-bold tracking-tighter text-white">SOLAR SYSTEM</h1>
          <p className="text-white/40 text-lg">Interactive 3D Visualization</p>
        </motion.div>
        
        <div className="mt-4 flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/10">
          <Ruler size={14} className="text-cosmos-accent" />
          <span className="text-xs text-white/40">Visualization Scale: Optimized for exploration (Not to scale)</span>
        </div>
      </div>

      {/* Planet Selector - Floating Middle Left */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2">
        {Object.keys(PLANET_DATA).map((id) => {
          const planet = PLANET_DATA[id];
          const isDwarf = id === 'pluto';
          return (
            <button
              key={id}
              onClick={() => handlePlanetSelect(id)}
              className={`px-4 py-2 rounded-full border text-xs font-medium transition-all ${
                selectedPlanetId === id || compareIds.includes(id)
                ? 'bg-cosmos-accent text-cosmos-black border-cosmos-accent'
                : 'border-white/10 hover:border-white/40 text-white/60'
              }`}
            >
              {planet.name}
              {isDwarf && <span className="ml-2 text-[10px] opacity-60">(Dwarf)</span>}
            </button>
          );
        })}
      </div>

      {/* Simulation Controls */}
      <div className="absolute bottom-8 left-8 z-10">
        <div className="bg-cosmos-slate/80 p-5 rounded-2xl border border-white/10 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest">Simulation</h3>
            <button 
              onClick={() => setPaused(!paused)} 
              className="p-2 bg-cosmos-accent text-cosmos-black rounded-lg hover:bg-white transition-colors"
              aria-label={paused ? 'Play simulation' : 'Pause simulation'}
            >
              {paused ? <Play size={16} fill="currentColor" /> : <Pause size={16} fill="currentColor" />}
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] text-white/40 mb-1">SPEED</span>
              <input 
                type="range" 
                min="0" 
                max="5" 
                step="0.1" 
                value={simSpeed}
                onChange={(e) => setSimSpeed(parseFloat(e.target.value))}
                className="w-24 accent-cosmos-accent"
                aria-label="Simulation speed"
              />
            </div>
            <span className="text-sm font-bold text-white/60">{simSpeed.toFixed(1)}x</span>
          </div>
        </div>
      </div>

      {/* Main Scene */}
      <div className="w-full h-full">
        <Scene onPlanetSelect={handlePlanetSelect} simSpeed={simSpeed} paused={paused} />
      </div>

      {/* Planet Info & Comparison Panel */}
      <AnimatePresence>
        {(selectedPlanetId || compareIds.length > 0) && (
          <motion.div
            key="info-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 w-full max-w-md h-full bg-cosmos-slate/95 backdrop-blur-xl border-l border-white/10 p-8 overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-10">
              <div>
                {compareMode ? (
                  <h2 className="text-4xl font-bold tracking-tighter text-white">PLANET COMPARISON</h2>
                ) : (
                  <div className="flex items-center gap-4">
                    <h2 className="text-6xl font-bold tracking-tighter text-white">{selectedPlanet?.name}</h2>
                    {selectedPlanetId && (
                      <button 
                        onClick={() => toggleFavorite('planets', selectedPlanetId)}
                        className={`p-2 rounded-full transition-colors ${isFavorite('planets', selectedPlanetId) ? 'bg-cosmos-accent text-cosmos-black' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
                        aria-label={isFavorite('planets', selectedPlanetId) ? `Remove ${selectedPlanet?.name} from favorites` : `Add ${selectedPlanet?.name} to favorites`}
                      >
                        <Heart size={20} fill={isFavorite('planets', selectedPlanetId) ? "currentColor" : "none"} />
                      </button>
                    )}
                  </div>
                )}
                <p className={compareMode ? "text-cosmos-accent" : "text-white/40"}>
                  {compareMode ? "Side-by-side analytical data" : "Planetary Profile"}
                </p>
              </div>
              <button 
                onClick={() => { setSelectedPlanetId(null); setCompareMode(false); setCompareIds([]); }}
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/60"
              >
                <ArrowLeft size={24} />
              </button>
            </div>

            {!compareMode ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-10"
              >
                {selectedPlanet && (
                  <>
                    <p className="text-white/70 text-lg leading-relaxed border-l-2 border-cosmos-accent pl-6">{selectedPlanet.description}</p>
                    
                    <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                      {[
                        { label: "Diameter", value: selectedPlanet.stats.diameter },
                        { label: "Mass", value: selectedPlanet.stats.mass },
                        { label: "Gravity", value: selectedPlanet.stats.gravity },
                        { label: "Temperature", value: selectedPlanet.stats.temperature },
                        { label: "Orbital Period", value: selectedPlanet.stats.orbitalPeriod },
                        { label: "Rotation Period", value: selectedPlanet.stats.rotationPeriod },
                        { label: "Moons", value: selectedPlanet.stats.moons },
                        { label: "Atmosphere", value: selectedPlanet.stats.atmosphere },
                      ].map((stat, i) => (
                        <div key={i}>
                          <p className="text-xs text-white/40 uppercase mb-1">{stat.label}</p>
                          <p className="text-lg font-bold">{stat.value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                      <h4 className="text-xs font-bold text-cosmos-accent uppercase mb-4">Interesting Facts</h4>
                      <ul className="space-y-3">
                        {selectedPlanet.facts.map((fact, i) => (
                          <li key={i} className="text-sm text-white/70 flex gap-3">
                            <span className="text-cosmos-accent">•</span>
                            {fact}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button 
                      onClick={() => {
                        setCompareMode(true);
                        if (selectedPlanetId) setCompareIds([selectedPlanetId]);
                      }}
                      className="w-full py-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors font-bold text-sm"
                    >
                      COMPARE WITH ANOTHER PLANET
                    </button>
                  </>
                )}
              </motion.div>
            ) : (
              <div className="space-y-8">
                <p className="text-sm text-white/40 mb-4">Select two planets from the menu to compare their core statistics side-by-side.</p>
                <div className="grid grid-cols-2 gap-4">
                  {compareIds.map(id => {
                    const p = PLANET_DATA[id];
                    return (
                      <div key={id} className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <h3 className="text-2xl font-bold mb-4 text-cosmos-accent">{p.name}</h3>
                        <div className="space-y-4">
                          {[
                            { label: "Diameter", value: p.stats.diameter },
                            { label: "Mass", value: p.stats.mass },
                            { label: "Gravity", value: p.stats.gravity },
                            { label: "Temperature", value: p.stats.temperature },
                            { label: "Moons", value: p.stats.moons },
                            { label: "Orbital Period", value: p.stats.orbitalPeriod },
                          ].map((stat, i) => (
                            <div key={i}>
                              <p className="text-[10px] text-white/40 uppercase">{stat.label}</p>
                              <p className="font-bold">{stat.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                  {compareIds.length === 0 && (
                    <div className="col-span-2 py-20 text-center text-white/40">
                      <p>Select planets from the navigation to begin comparison</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SolarSystem;
