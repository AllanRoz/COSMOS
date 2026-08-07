import React, { useState, useEffect } from 'react';
import { Search, Heart, X, Star, Telescope, Orbit, Navigation, Waves, ImageIcon, Zap, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PLANET_DATA } from '../constants/planetData';
import { MISSION_DATA } from '../mock/missionData';
import { ASTRONOMY_DATA } from '../mock/astronomyData';

const GlobalSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    
    const planets = Object.values(PLANET_DATA).filter(p => p.name.toLowerCase().includes(lowerQuery));
    const missions = MISSION_DATA.filter(m => m.name.toLowerCase().includes(lowerQuery) || m.description.toLowerCase().includes(lowerQuery));
    const astro = ASTRONOMY_DATA.constellations.filter(c => c.name.toLowerCase().includes(lowerQuery));

    setResults({ planets, missions, astro });
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-cosmos-black/90 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="bg-cosmos-slate border border-white/10 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-8 border-b border-white/5">
          <div className="relative">
            <input
              type="text"
              autoFocus
              placeholder="Search planets, missions, constellations..."
              className="w-full bg-cosmos-black border border-white/10 rounded-xl py-4 pl-12 pr-32 focus:outline-none focus:border-cosmos-accent transition-all text-lg"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button 
              onClick={handleSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-cosmos-accent text-cosmos-black p-2 rounded-lg font-bold hover:bg-white transition-colors"
            >
              <Search size={24} />
            </button>
            <button 
              onClick={clearSearch}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {results.length > 0 ? (
            <div className="space-y-8">
              {results.planets.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Planets</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {results.planets.map(p => (
                      <div 
                        key={p.name} 
                        onClick={() => navigate(`/solar-system`)}
                        className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-cosmos-accent/50 cursor-pointer transition-all"
                      >
                        <p className="font-bold">{p.name}</p>
                        <p className="text-xs text-white/40">{p.stats.diameter}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {results.missions.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Missions</h3>
                  <div className="space-y-2">
                    {results.missions.map(m => (
                      <div 
                        key={m.id} 
                        onClick={() => navigate(`/missions/${m.id}`)}
                        className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-cosmos-accent/50 cursor-pointer transition-all"
                      >
                        <p className="font-bold">{m.name}</p>
                        <p className="text-xs text-white/40">{m.status}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {results.astro.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Constellations</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {results.astro.map(c => (
                      <div 
                        key={c.name} 
                        onClick={() => navigate('/sky')}
                        className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-cosmos-accent/50 cursor-pointer transition-all"
                      >
                        <p className="font-bold">{c.name}</p>
                        <p className="text-xs text-white/40">{c.region}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : query && (
            <div className="text-center py-10">
              <p className="text-white/40">No results found for "{query}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobalSearch;
