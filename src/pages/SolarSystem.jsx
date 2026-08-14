import React, { useState, useEffect } from 'react';
import Scene from '../components/three/Scene';
import { PLANET_DATA } from '../constants/planetData';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Heart, Ruler, Play, Pause, SlidersHorizontal, X } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
};

const SolarSystem = () => {
  const [selectedPlanetId, setSelectedPlanetId] = useState(null);
  const [compareMode, setCompareMode] = useState(false);
  const [compareIds, setCompareIds] = useState([]);
  const [simSpeed, setSimSpeed] = useState(1);
  const [paused, setPaused] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const isMobile = useIsMobile();

  const selectedPlanet = selectedPlanetId ? PLANET_DATA[selectedPlanetId] : null;

  const handlePlanetSelect = (id) => {
    if (compareMode) {
      if (compareIds.includes(id)) {
        setCompareIds(compareIds.filter(i => i !== id));
      } else if (compareIds.length < 2) {
        setCompareIds([...compareIds, id]);
      }
    } else {
      setSelectedPlanetId(id);
    }
  };

  const closePanels = () => {
    setSelectedPlanetId(null);
    setCompareMode(false);
    setCompareIds([]);
  };

  const panelOpen = selectedPlanetId !== null || compareIds.length > 0;

  return (
    /*
      h-[calc(100vh-56px)] on mobile accounts for the 56px top header added
      by DashboardLayout. On md+ the header is hidden so we use h-screen.
    */
    <div className="relative w-full h-[calc(100vh-56px)] md:h-screen bg-cosmos-black overflow-hidden">

      {/* -------------------------------------------
          DESKTOP LAYOUT  (md and above)
          Left column: title + planet selector + sim controls
          Right: Three.js canvas (shrinks when panel is open)
      ------------------------------------------- */}

      {/* -- Desktop left sidebar -- */}
      {!isMobile && (
        <div
          className="absolute left-0 top-0 bottom-0 z-10 flex flex-col justify-between py-8 pl-8 pr-3"
          style={{ width: '180px' }}
        >
          {/* Title block — fixed at the top */}
          <div className="pointer-events-none">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <h1 className="text-3xl xl:text-5xl font-bold tracking-tighter text-white leading-none">
                SOLAR<br />SYSTEM
              </h1>
              <p className="text-white/40 text-xs mt-2 hidden lg:block">
                Interactive 3D Visualization
              </p>
            </motion.div>
            <div className="mt-3 flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-full border border-white/10 w-fit">
              <Ruler size={10} className="text-cosmos-accent shrink-0" />
              <span className="text-[9px] text-white/40">Not to scale</span>
            </div>
          </div>

          {/* Planet selector — scrollable, centred vertically in remaining space */}
          <div className="flex-1 flex flex-col justify-center gap-1.5 py-4 overflow-y-auto scrollbar-none">
            {Object.keys(PLANET_DATA).map((id) => {
              const planet = PLANET_DATA[id];
              const isDwarf = id === 'pluto';
              const active = selectedPlanetId === id || compareIds.includes(id);
              return (
                <button
                  key={id}
                  onClick={() => handlePlanetSelect(id)}
                  className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all text-left ${
                    active
                      ? 'bg-cosmos-accent text-cosmos-black border-cosmos-accent'
                      : 'border-white/10 hover:border-white/40 text-white/60 bg-black/30 backdrop-blur-sm'
                  }`}
                >
                  {planet.name}
                  {isDwarf && <span className="ml-1 text-[9px] opacity-60">(Dwarf)</span>}
                </button>
              );
            })}
          </div>

          {/* Simulation controls — pinned at the bottom */}
          <div className="bg-cosmos-slate/80 p-4 rounded-2xl border border-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Simulation</h3>
              <button
                onClick={() => setPaused(!paused)}
                className="p-1.5 bg-cosmos-accent text-cosmos-black rounded-lg hover:bg-white transition-colors flex items-center justify-center min-w-[28px] min-h-[28px]"
                aria-label={paused ? 'Play simulation' : 'Pause simulation'}
              >
                {paused ? <Play size={13} fill="currentColor" /> : <Pause size={13} fill="currentColor" />}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex flex-col flex-1">
                <span className="text-[9px] text-white/40 mb-1">SPEED</span>
                <input
                  type="range" min="0" max="5" step="0.1" value={simSpeed}
                  onChange={(e) => setSimSpeed(parseFloat(e.target.value))}
                  className="w-full accent-cosmos-accent"
                  aria-label="Simulation speed"
                />
              </div>
              <span className="text-xs font-bold text-white/60 w-7 text-right tabular-nums">
                {simSpeed.toFixed(1)}x
              </span>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------
          MOBILE LAYOUT
      ------------------------------------------- */}

      {/* -- Mobile: compact title top-left -- */}
      {isMobile && (
        <div className="absolute top-3 left-3 z-10 pointer-events-none">
          <h1 className="text-xl font-bold tracking-tighter text-white leading-none">SOLAR SYSTEM</h1>
        </div>
      )}

      {/* -- Mobile: planet chip strip — below title, above canvas -- */}
      {isMobile && (
        <div className="absolute top-10 left-0 right-0 z-10 px-2">
          <div
            className="flex gap-2 overflow-x-auto pb-1 scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {Object.keys(PLANET_DATA).map((id) => {
              const active = selectedPlanetId === id || compareIds.includes(id);
              return (
                <button
                  key={id}
                  onClick={() => handlePlanetSelect(id)}
                  className={`shrink-0 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                    active
                      ? 'bg-cosmos-accent text-cosmos-black border-cosmos-accent'
                      : 'border-white/20 text-white/70 bg-black/50 backdrop-blur-sm'
                  }`}
                >
                  {PLANET_DATA[id].name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* -- Mobile: sim controls toggle -- */}
      {isMobile && (
        <>
          <button
            onClick={() => setShowControls(!showControls)}
            className="absolute bottom-4 right-4 z-10 bg-cosmos-slate/90 backdrop-blur-xl
                       p-3 rounded-2xl border border-white/10 flex items-center justify-center min-h-[44px] min-w-[44px]"
            aria-label="Toggle simulation controls"
          >
            <SlidersHorizontal size={18} className="text-cosmos-accent" />
          </button>

          <AnimatePresence>
            {showControls && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                className="absolute bottom-16 right-4 z-10 bg-cosmos-slate/95 backdrop-blur-xl
                           p-4 rounded-2xl border border-white/10 w-52"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Simulation</span>
                  <button
                    onClick={() => setPaused(!paused)}
                    className="p-2 bg-cosmos-accent text-cosmos-black rounded-lg min-w-[32px] min-h-[32px] flex items-center justify-center"
                    aria-label={paused ? 'Play' : 'Pause'}
                  >
                    {paused ? <Play size={13} fill="currentColor" /> : <Pause size={13} fill="currentColor" />}
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-white/40">SPEED</span>
                  <input
                    type="range" min="0" max="5" step="0.1" value={simSpeed}
                    onChange={(e) => setSimSpeed(parseFloat(e.target.value))}
                    className="flex-1 accent-cosmos-accent"
                    aria-label="Simulation speed"
                  />
                  <span className="text-xs font-bold text-white/60 w-8 text-right tabular-nums">
                    {simSpeed.toFixed(1)}x
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* -------------------------------------------
          THREE.JS CANVAS
          On desktop we indent the canvas left to avoid the sidebar.
          We do NOT indent right — the info panel overlays on top of the
          canvas instead so the 3D scene always uses max available space.
      ------------------------------------------- */}
      <div
        className="absolute top-0 bottom-0 right-0"
        style={{ left: isMobile ? 0 : '180px' }}
      >
        <Scene onPlanetSelect={handlePlanetSelect} simSpeed={simSpeed} paused={paused} />
      </div>

      {/* -------------------------------------------
          INFO PANEL
          Desktop: slides in from the right over the canvas
          Mobile:  rises from the bottom as a sheet
      ------------------------------------------- */}
      <AnimatePresence>
        {panelOpen && (
          isMobile ? (
            /* -- Mobile: bottom sheet -- */
            <motion.div
              key="mobile-sheet"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 z-20
                         bg-cosmos-slate/98 backdrop-blur-xl
                         border-t border-white/10 rounded-t-3xl
                         max-h-[68vh] flex flex-col"
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-3 pb-1 shrink-0">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>

              {/* Sheet header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  {compareMode ? (
                    <h2 className="text-lg font-bold tracking-tight text-white">Planet Comparison</h2>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold tracking-tighter text-white">{selectedPlanet?.name}</h2>
                      {selectedPlanetId && (
                        <button
                          onClick={() => toggleFavorite('planets', selectedPlanetId)}
                          className={`p-2 rounded-full transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center shrink-0 ${
                            isFavorite('planets', selectedPlanetId)
                              ? 'bg-cosmos-accent text-cosmos-black'
                              : 'bg-white/5 text-white/60'
                          }`}
                          aria-label={`${isFavorite('planets', selectedPlanetId) ? 'Remove from' : 'Add to'} favorites`}
                        >
                          <Heart size={17} fill={isFavorite('planets', selectedPlanetId) ? 'currentColor' : 'none'} />
                        </button>
                      )}
                    </>
                  )}
                </div>
                <button
                  onClick={closePanels}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 min-w-[44px] min-h-[44px] flex items-center justify-center shrink-0"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto px-5 py-4">
                {!compareMode && selectedPlanet && (
                  <MobilePlanetContent
                    planet={selectedPlanet}
                    onCompare={() => {
                      setCompareMode(true);
                      if (selectedPlanetId) setCompareIds([selectedPlanetId]);
                    }}
                  />
                )}
                {compareMode && (
                  <MobileCompareContent compareIds={compareIds} allData={PLANET_DATA} />
                )}
              </div>
            </motion.div>
          ) : (
            /* -- Desktop: right slide-in panel -- */
            <motion.div
              key="desktop-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 z-20
                         w-full max-w-sm h-full
                         bg-cosmos-slate/95 backdrop-blur-xl
                         border-l border-white/10
                         flex flex-col overflow-hidden"
            >
              {/* Panel header */}
              <div className="flex justify-between items-start p-6 shrink-0 border-b border-white/5">
                <div className="min-w-0 flex-1 pr-3">
                  {compareMode ? (
                    <>
                      <h2 className="text-2xl font-bold tracking-tighter text-white">PLANET COMPARISON</h2>
                      <p className="text-cosmos-accent text-sm mt-1">Side-by-side analytical data</p>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <h2 className="text-4xl font-bold tracking-tighter text-white break-all leading-none">
                          {selectedPlanet?.name}
                        </h2>
                        {selectedPlanetId && (
                          <button
                            onClick={() => toggleFavorite('planets', selectedPlanetId)}
                            className={`p-2 rounded-full transition-colors shrink-0 ${
                              isFavorite('planets', selectedPlanetId)
                                ? 'bg-cosmos-accent text-cosmos-black'
                                : 'bg-white/5 text-white/60 hover:bg-white/10'
                            }`}
                            aria-label="Toggle favorite"
                          >
                            <Heart size={18} fill={isFavorite('planets', selectedPlanetId) ? 'currentColor' : 'none'} />
                          </button>
                        )}
                      </div>
                      <p className="text-white/40 text-sm mt-1">Planetary Profile</p>
                    </>
                  )}
                </div>
                <button
                  onClick={closePanels}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 min-w-[40px] min-h-[40px] flex items-center justify-center shrink-0"
                  aria-label="Close panel"
                >
                  <ArrowLeft size={20} />
                </button>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto p-6">
                {!compareMode ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    {selectedPlanet && (
                      <>
                        <p className="text-white/70 text-sm leading-relaxed border-l-2 border-cosmos-accent pl-4">
                          {selectedPlanet.description}
                        </p>

                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { label: 'Diameter',        value: selectedPlanet.stats.diameter },
                            { label: 'Mass',            value: selectedPlanet.stats.mass },
                            { label: 'Gravity',         value: selectedPlanet.stats.gravity },
                            { label: 'Temperature',     value: selectedPlanet.stats.temperature },
                            { label: 'Orbital Period',  value: selectedPlanet.stats.orbitalPeriod },
                            { label: 'Rotation Period', value: selectedPlanet.stats.rotationPeriod },
                            { label: 'Moons',           value: selectedPlanet.stats.moons },
                            { label: 'Atmosphere',      value: selectedPlanet.stats.atmosphere },
                          ].map((stat, i) => (
                            <div key={i} className="bg-white/5 rounded-xl p-3">
                              <p className="text-[10px] text-white/40 uppercase mb-1">{stat.label}</p>
                              <p className="text-sm font-bold break-words">{stat.value}</p>
                            </div>
                          ))}
                        </div>

                        <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                          <h4 className="text-[11px] font-bold text-cosmos-accent uppercase mb-3">Interesting Facts</h4>
                          <ul className="space-y-2">
                            {selectedPlanet.facts.map((fact, i) => (
                              <li key={i} className="text-xs text-white/70 flex gap-2">
                                <span className="text-cosmos-accent shrink-0">•</span>
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
                          className="w-full py-3 bg-white/5 border border-white/10 rounded-xl
                                     hover:bg-white/10 transition-colors font-bold text-xs tracking-wider"
                        >
                          COMPARE WITH ANOTHER PLANET
                        </button>
                      </>
                    )}
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-xs text-white/40">Select up to two planets from the left menu to compare.</p>
                    {compareIds.length === 0 ? (
                      <div className="py-16 text-center text-white/40 text-sm">
                        No planets selected yet
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {compareIds.map(id => {
                          const p = PLANET_DATA[id];
                          return (
                            <div key={id} className="bg-white/5 p-4 rounded-2xl border border-white/10">
                              <h3 className="text-lg font-bold mb-3 text-cosmos-accent">{p.name}</h3>
                              <div className="grid grid-cols-2 gap-2">
                                {[
                                  { label: 'Diameter',    value: p.stats.diameter },
                                  { label: 'Mass',        value: p.stats.mass },
                                  { label: 'Gravity',     value: p.stats.gravity },
                                  { label: 'Temperature', value: p.stats.temperature },
                                  { label: 'Moons',       value: p.stats.moons },
                                  { label: 'Orbital Period', value: p.stats.orbitalPeriod },
                                ].map((s, i) => (
                                  <div key={i}>
                                    <p className="text-[10px] text-white/40 uppercase">{s.label}</p>
                                    <p className="font-bold text-xs">{s.value}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
};

/* -- Mobile planet content -- */
const MobilePlanetContent = ({ planet, onCompare }) => (
  <div className="space-y-4 pb-4">
    <p className="text-white/70 text-sm leading-relaxed border-l-2 border-cosmos-accent pl-4">
      {planet.description}
    </p>
    <div className="grid grid-cols-2 gap-2.5">
      {[
        { label: 'Diameter',       value: planet.stats.diameter },
        { label: 'Mass',           value: planet.stats.mass },
        { label: 'Gravity',        value: planet.stats.gravity },
        { label: 'Temperature',    value: planet.stats.temperature },
        { label: 'Orbital Period', value: planet.stats.orbitalPeriod },
        { label: 'Moons',          value: planet.stats.moons },
      ].map((stat, i) => (
        <div key={i} className="bg-white/5 rounded-xl p-3">
          <p className="text-[10px] text-white/40 uppercase mb-1">{stat.label}</p>
          <p className="text-sm font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
      <h4 className="text-[10px] font-bold text-cosmos-accent uppercase mb-3">Facts</h4>
      <ul className="space-y-2">
        {planet.facts.map((fact, i) => (
          <li key={i} className="text-xs text-white/70 flex gap-2">
            <span className="text-cosmos-accent shrink-0">•</span>
            {fact}
          </li>
        ))}
      </ul>
    </div>
    <button
      onClick={onCompare}
      className="w-full py-3 bg-white/5 border border-white/10 rounded-xl font-bold text-xs tracking-wider hover:bg-white/10 transition-colors"
    >
      COMPARE WITH ANOTHER PLANET
    </button>
  </div>
);

/* -- Mobile compare content -- */
const MobileCompareContent = ({ compareIds, allData }) => (
  <div className="space-y-4 pb-4">
    <p className="text-xs text-white/40">Select planets from the top row to compare.</p>
    {compareIds.length === 0 ? (
      <p className="text-center text-white/40 py-8 text-sm">Select planets from the row above</p>
    ) : (
      compareIds.map(id => {
        const p = allData[id];
        return (
          <div key={id} className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <h3 className="text-lg font-bold mb-3 text-cosmos-accent">{p.name}</h3>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { label: 'Diameter',       value: p.stats.diameter },
                { label: 'Mass',           value: p.stats.mass },
                { label: 'Gravity',        value: p.stats.gravity },
                { label: 'Temperature',    value: p.stats.temperature },
                { label: 'Moons',          value: p.stats.moons },
                { label: 'Orbital Period', value: p.stats.orbitalPeriod },
              ].map((s, i) => (
                <div key={i}>
                  <p className="text-[10px] text-white/40 uppercase">{s.label}</p>
                  <p className="font-bold text-sm">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })
    )}
  </div>
);

export default SolarSystem;
