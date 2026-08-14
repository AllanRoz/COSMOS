import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchData } from '../../services/search';
import { X, ChevronRight, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GlobalSearch = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ planets: [], missions: [], imagery: [] });
  const navigate = useNavigate();
  const inputRef = useRef(null);

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

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleSearch = (item, type) => {
    if (type === 'planet') {
      navigate('/solar-system');
    } else if (type === 'mission') {
      navigate(`/missions/${item.id}`);
    } else {
      navigate('/nasa-explorer');
    }
    onClose();
    setQuery('');
    setResults({ planets: [], missions: [], imagery: [] });
  };

  const hasResults =
    results.planets.length > 0 ||
    results.missions.length > 0 ||
    results.imagery.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-cosmos-black/95 z-[60] flex items-start sm:items-center justify-center p-4 pt-16 sm:pt-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-2xl bg-cosmos-slate border border-white/10 rounded-2xl
                       shadow-2xl flex flex-col max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header row */}
            <div className="flex items-center gap-3 p-4 border-b border-white/10">
              <Search size={18} className="text-cosmos-accent shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search planets, missions, imagery..."
                className="flex-1 bg-transparent text-base focus:outline-none placeholder:text-white/30"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="off"
              />
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Close search"
              >
                <X size={20} />
              </button>
            </div>

            {/* Results */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {results.planets.length > 0 && (
                <ResultSection
                  title="Planets"
                  items={results.planets}
                  labelKey="name"
                  onSelect={(item) => handleSearch(item, 'planet')}
                />
              )}
              {results.missions.length > 0 && (
                <ResultSection
                  title="Missions"
                  items={results.missions}
                  labelKey="name"
                  onSelect={(item) => handleSearch(item, 'mission')}
                />
              )}
              {results.imagery.length > 0 && (
                <ResultSection
                  title="Imagery"
                  items={results.imagery}
                  labelKey="title"
                  onSelect={(item) => handleSearch(item, 'image')}
                />
              )}
              {query.length > 2 && !hasResults && (
                <p className="text-white/40 text-center py-10">
                  No results found for &ldquo;{query}&rdquo;
                </p>
              )}
              {query.length === 0 && (
                <p className="text-white/30 text-sm text-center py-6">
                  Start typing to search across the cosmos…
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ResultSection = ({ title, items, labelKey, onSelect }) => (
  <div>
    <h3 className="text-[11px] font-bold text-white/40 uppercase tracking-widest mb-3">
      {title}
    </h3>
    <div className="space-y-2">
      {items.map((item, i) => (
        <button
          key={i}
          className="w-full flex items-center justify-between p-3 bg-white/5 rounded-xl
                     hover:bg-white/10 cursor-pointer transition-colors text-left min-h-[48px]"
          onClick={() => onSelect(item)}
        >
          <span className="font-semibold text-sm">{item[labelKey]}</span>
          <ChevronRight size={16} className="text-white/40 shrink-0" />
        </button>
      ))}
    </div>
  </div>
);

export default GlobalSearch;
