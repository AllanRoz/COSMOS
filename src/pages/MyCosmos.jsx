import React from 'react';
import { Heart, Rocket, Image, Satellite, Star, Trash2, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PLANET_DATA } from '../constants/planetData';
import { MISSION_DATA } from '../mock/missionData';
import { SATELLITE_DATA } from '../mock/satelliteData';
import { ASTRONOMY_DATA } from '../mock/astronomyData';
import { useFavorites } from '../context/FavoritesContext';
import { Link } from 'react-router-dom';

const MyCosmos = () => {
  const { getFavoritesByType, toggleFavorite, clearAllFavorites } = useFavorites();

  const planetFavorites = getFavoritesByType('planets').map(id => PLANET_DATA[id]).filter(Boolean);
  const missionFavorites = getFavoritesByType('missions').map(id => MISSION_DATA[id]).filter(Boolean);
  const satelliteFavorites = getFavoritesByType('satellites').map(id => SATELLITE_DATA[id]).filter(Boolean);
  const astronomyFavorites = getFavoritesByType('astronomy');
  const imageFavorites = getFavoritesByType('images');

  const hasAnyFavorites = planetFavorites.length > 0 || 
                          missionFavorites.length > 0 || 
                          satelliteFavorites.length > 0 ||
                          astronomyFavorites.length > 0 ||
                          imageFavorites.length > 0;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-10 flex justify-between items-start">
        <div>
          <h1 className="text-5xl font-bold tracking-tighter text-white">MY COSMOS</h1>
          <p className="text-white/40 text-lg">Your curated universe of discoveries</p>
        </div>
        {hasAnyFavorites && (
          <button
            onClick={clearAllFavorites}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors text-sm"
          >
            <Trash2 size={16} />
            Clear All
          </button>
        )}
      </header>

      {!hasAnyFavorites ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <Heart size={64} className="mx-auto text-white/20 mb-6" />
          <h2 className="text-2xl font-bold text-white/60 mb-2">No Favorites Yet</h2>
          <p className="text-white/40 max-w-md mx-auto">
            Explore the cosmos and heart your favorite planets, missions, satellites, and more. They'll appear here.
          </p>
        </motion.div>
      ) : (
        <div className="space-y-12">
          {planetFavorites.length > 0 && (
            <section>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Globe size={20} className="text-cosmos-accent" /> Favorite Planets
                <span className="text-sm text-white/40 font-normal">({planetFavorites.length})</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {planetFavorites.map(p => (
                  <motion.div 
                    key={p.name} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-cosmos-slate p-5 rounded-2xl border border-white/5 hover:border-cosmos-accent/30 transition-all group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div 
                        className="w-12 h-12 rounded-full" 
                        style={{ backgroundColor: p.color }}
                      />
                      <button
                        onClick={() => toggleFavorite('planets', p.name.toLowerCase())}
                        className="p-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                      >
                        <Heart size={16} fill="currentColor" />
                      </button>
                    </div>
                    <p className="font-bold text-lg">{p.name}</p>
                    <p className="text-xs text-white/40 mt-1">{p.stats.diameter}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {missionFavorites.length > 0 && (
            <section>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Rocket size={20} className="text-cosmos-accent" /> Favorite Missions
                <span className="text-sm text-white/40 font-normal">({missionFavorites.length})</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {missionFavorites.map(m => (
                  <motion.div 
                    key={m.id} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-cosmos-slate p-6 rounded-2xl border border-white/5 hover:border-cosmos-accent/30 transition-all"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-bold text-xl">{m.name}</p>
                        <p className="text-xs text-cosmos-accent">{m.provider}</p>
                      </div>
                      <button
                        onClick={() => toggleFavorite('missions', m.id)}
                        className="p-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                      >
                        <Heart size={16} fill="currentColor" />
                      </button>
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        m.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                        m.status === 'Completed' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {m.status}
                      </span>
                      <span className="text-xs text-white/40">{m.launchDate}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {imageFavorites.length > 0 && (
            <section>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Image size={20} className="text-cosmos-accent" /> Favorite Images
                <span className="text-sm text-white/40 font-normal">({imageFavorites.length})</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {imageFavorites.map((img, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-cosmos-slate rounded-2xl border border-white/5 overflow-hidden hover:border-cosmos-accent/30 transition-all"
                  >
                    <div className="aspect-video bg-white/5">
                      {img.url && <img src={img.url} alt={img.title} className="w-full h-full object-cover" />}
                    </div>
                    <div className="p-4 flex justify-between items-start">
                      <div>
                        <p className="font-bold text-sm">{img.title || 'NASA Image'}</p>
                        <p className="text-xs text-white/40 mt-1 truncate">{img.date || 'APOD'}</p>
                      </div>
                      <button
                        onClick={() => toggleFavorite('images', img.url)}
                        className="p-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                      >
                        <Heart size={16} fill="currentColor" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {satelliteFavorites.length > 0 && (
            <section>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Satellite size={20} className="text-cosmos-accent" /> Favorite Satellites
                <span className="text-sm text-white/40 font-normal">({satelliteFavorites.length})</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {satelliteFavorites.map(s => (
                  <motion.div 
                    key={s.id} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-cosmos-slate p-6 rounded-2xl border border-white/5 hover:border-cosmos-accent/30 transition-all"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-bold text-xl">{s.name}</p>
                        <p className="text-xs text-cosmos-accent">{s.type}</p>
                      </div>
                      <button
                        onClick={() => toggleFavorite('satellites', s.id)}
                        className="p-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                      >
                        <Heart size={16} fill="currentColor" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                      <div>
                        <p className="text-white/40 text-xs">Altitude</p>
                        <p className="font-bold">{s.altitude}</p>
                      </div>
                      <div>
                        <p className="text-white/40 text-xs">Orbit</p>
                        <p className="font-bold">{s.orbit}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {astronomyFavorites.length > 0 && (
            <section>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Star size={20} className="text-cosmos-accent" /> Astronomy Objects
                <span className="text-sm text-white/40 font-normal">({astronomyFavorites.length})</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {astronomyFavorites.map((obj, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-cosmos-slate p-5 rounded-2xl border border-white/5 hover:border-cosmos-accent/30 transition-all"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <Star size={24} className="text-yellow-400" />
                      <button
                        onClick={() => toggleFavorite('astronomy', obj.name)}
                        className="p-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                      >
                        <Heart size={16} fill="currentColor" />
                      </button>
                    </div>
                    <p className="font-bold text-lg">{obj.name || obj}</p>
                    <p className="text-xs text-white/40 mt-1">{obj.type || 'Celestial Object'}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default MyCosmos;
