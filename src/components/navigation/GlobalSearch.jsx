import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchData } from '../../services/search';
import { X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GlobalSearch = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ planets: [], missions: [], imagery: [] });
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length > 2) {
      const data = searchData(query);
      setResults(data);
    } else {
      setResults({ planets: [], missions: [], imagery: [] });
    }
  }, [query]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleSearch = (item, type) => {
    if (type === 'planet') {
      navigate(`/solar-system`);
    } else if (type === 'mission') {
      navigate(`/missions/${item.id}`);
    } else {
      navigate(`/nasa-explorer`);
    }
    onClose();
    setQuery('');
    setResults({ planets: [], missions: [], imagery: [] });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-cosmos-black z-50 flex items-center justify-center p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-3xl bg-cosmos-slate border border-white/10 rounded-3xl p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold tracking-tighter text-cosmos-accent">GLOBAL SEARCH</h2>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full">
                <X size={24} />
              </button>
            </div>

            <input 
              autoFocus
              type="text" 
              placeholder="Search planets, missions, imagery..." 
              className="w-full bg-cosmos-black border border-white/10 p-4 rounded-xl text-lg mb-8 focus:border-cosmos-accent outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <div className="space-y-8 max-h-[60vh] overflow-y-auto pr-2">
              {results.planets.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Planets</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {results.planets.map(p => (
                      <button
                        key={p.name}
                        className="w-full flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 cursor-pointer transition-colors text-left"
                        onClick={() => handleSearch(p, 'planet')}
                      >
                        <span className="font-bold">{p.name}</span>
                        <ChevronRight size={16} />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {results.missions.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Missions</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {results.missions.map(m => (
                      <button
                        key={m.id}
                        className="w-full flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 cursor-pointer transition-colors text-left"
                        onClick={() => handleSearch(m, 'mission')}
                      >
                        <span className="font-bold">{m.name}</span>
                        <ChevronRight size={16} />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {results.imagery.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Imagery</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {results.imagery.map((img, i) => (
                      <button
                        key={i}
                        className="w-full flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 cursor-pointer transition-colors text-left"
                        onClick={() => handleSearch(img, 'image')}
                      >
                        <span className="font-bold">{img.title}</span>
                        <ChevronRight size={16} />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {query.length > 2 && results.planets.length === 0 && results.missions.length === 0 && results.imagery.length === 0 && (
                <p className="text-white/40 text-center py-10">No results found for "{query}"</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlobalSearch;
