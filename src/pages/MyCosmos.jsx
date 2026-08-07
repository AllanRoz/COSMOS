import React from 'react';
import { Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PLANET_DATA } from '../constants/planetData';
import { MISSION_DATA } from '../mock/missionData';
import { Navigation } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

const MyCosmos = () => {
  const { favorites, isFavorite } = useFavorites();

  const planetFavorites = Object.values(PLANET_DATA).filter(p => isFavorite(p.name));
  const missionFavorites = MISSION_DATA.filter(m => isFavorite(m.id));

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tighter">MY COSMOS</h1>
        <p className="text-white/40">Your curated universe of discoveries.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <section>
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Navigation size={20} className="text-cosmos-accent" /> Favorite Planets
          </h3>
          {planetFavorites.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {planetFavorites.map(p => (
                <motion.div 
                  key={p.name} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-cosmos-slate p-4 rounded-xl border border-white/5"
                >
                  <p className="font-bold">{p.name}</p>
                  <p className="text-xs text-white/40">{p.stats.diameter}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-white/40 text-sm">No favorite planets yet.</p>
          )}
        </section>

        <section>
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Heart size={20} className="text-cosmos-accent" /> Favorite Missions
          </h3>
          <div className="space-y-4">
            {missionFavorites.length > 0 ? (
              missionFavorites.map(m => (
                <motion.div 
                  key={m.id} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-cosmos-slate p-4 rounded-xl border border-white/5"
                >
                  <p className="font-bold">{m.name}</p>
                  <p className="text-xs text-white/40">{m.status}</p>
                </motion.div>
              ))
            ) : (
              <p className="text-white/40 text-sm">No favorite missions yet.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MyCosmos;
