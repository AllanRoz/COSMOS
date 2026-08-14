import React from 'react';
import { Heart, Rocket, Image, Satellite, Star, Trash2, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { PLANET_DATA } from '../constants/planetData';
import { MISSION_DATA } from '../mock/missionData';
import { SATELLITE_DATA } from '../mock/satelliteData';
import { useFavorites } from '../context/FavoritesContext';

const MyCosmos = () => {
  const { getFavoritesByType, toggleFavorite, clearAllFavorites } = useFavorites();

  const planetFavorites    = getFavoritesByType('planets').map(id => PLANET_DATA[id]).filter(Boolean);
  const missionFavorites   = getFavoritesByType('missions').map(id => MISSION_DATA[id]).filter(Boolean);
  const satelliteFavorites = getFavoritesByType('satellites').map(id => SATELLITE_DATA[id]).filter(Boolean);
  const astronomyFavorites = getFavoritesByType('astronomy');
  const imageFavorites     = getFavoritesByType('images');

  const hasAnyFavorites =
    planetFavorites.length > 0 || missionFavorites.length > 0 ||
    satelliteFavorites.length > 0 || astronomyFavorites.length > 0 || imageFavorites.length > 0;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* -- Header -- */}
      <header className="mb-8 md:mb-10 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tighter text-white">MY COSMOS</h1>
          <p className="text-white/40 text-sm sm:text-lg mt-1">Your curated universe of discoveries</p>
        </div>
        {hasAnyFavorites && (
          <button
            onClick={clearAllFavorites}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg
                       hover:bg-red-500/20 transition-colors text-sm min-h-[44px] shrink-0"
          >
            <Trash2 size={15} />
            <span className="hidden sm:inline">Clear All</span>
          </button>
        )}
      </header>

      {/* -- Empty state -- */}
      {!hasAnyFavorites ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <Heart size={56} className="mx-auto text-white/20 mb-5" />
          <h2 className="text-xl font-bold text-white/60 mb-2">No Favorites Yet</h2>
          <p className="text-white/40 max-w-sm mx-auto text-sm">
            Explore the cosmos and heart your favorite planets, missions, satellites, and more. They'll appear here.
          </p>
        </motion.div>
      ) : (
        <div className="space-y-10">

          {/* -- Planets -- */}
          {planetFavorites.length > 0 && (
            <Section title="Favorite Planets" icon={Globe} count={planetFavorites.length}>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {planetFavorites.map(p => (
                  <motion.div
                    key={p.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-cosmos-slate p-4 rounded-2xl border border-white/5 hover:border-cosmos-accent/30 transition-all"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="w-10 h-10 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                      <FavBtn onClick={() => toggleFavorite('planets', p.name.toLowerCase())} />
                    </div>
                    <p className="font-bold text-base">{p.name}</p>
                    <p className="text-xs text-white/40 mt-1">{p.stats.diameter}</p>
                  </motion.div>
                ))}
              </div>
            </Section>
          )}

          {/* -- Missions -- */}
          {missionFavorites.length > 0 && (
            <Section title="Favorite Missions" icon={Rocket} count={missionFavorites.length}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {missionFavorites.map(m => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-cosmos-slate p-5 rounded-2xl border border-white/5 hover:border-cosmos-accent/30 transition-all"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="min-w-0">
                        <p className="font-bold text-lg truncate">{m.name}</p>
                        <p className="text-xs text-cosmos-accent">{m.provider}</p>
                      </div>
                      <FavBtn onClick={() => toggleFavorite('missions', m.id)} />
                    </div>
                    <div className="flex items-center gap-3 mt-3 flex-wrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        m.status === 'Active'    ? 'bg-green-500/20 text-green-400' :
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
            </Section>
          )}

          {/* -- Images -- */}
          {imageFavorites.length > 0 && (
            <Section title="Favorite Images" icon={Image} count={imageFavorites.length}>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {imageFavorites.map((img, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-cosmos-slate rounded-2xl border border-white/5 overflow-hidden hover:border-cosmos-accent/30 transition-all"
                  >
                    <div className="aspect-video bg-white/5">
                      {img.url && (
                        <img src={img.url} alt={img.title || 'NASA Image'} className="w-full h-full object-cover" loading="lazy" />
                      )}
                    </div>
                    <div className="p-3 flex justify-between items-start gap-2">
                      <div className="min-w-0">
                        <p className="font-bold text-xs truncate">{img.title || 'NASA Image'}</p>
                        <p className="text-[10px] text-white/40 mt-0.5 truncate">{img.date || 'APOD'}</p>
                      </div>
                      <FavBtn onClick={() => toggleFavorite('images', img.url)} size={14} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </Section>
          )}

          {/* -- Satellites -- */}
          {satelliteFavorites.length > 0 && (
            <Section title="Favorite Satellites" icon={Satellite} count={satelliteFavorites.length}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {satelliteFavorites.map(s => (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-cosmos-slate p-5 rounded-2xl border border-white/5 hover:border-cosmos-accent/30 transition-all"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-bold text-lg">{s.name}</p>
                        <p className="text-xs text-cosmos-accent">{s.type}</p>
                      </div>
                      <FavBtn onClick={() => toggleFavorite('satellites', s.id)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
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
            </Section>
          )}

          {/* -- Astronomy objects -- */}
          {astronomyFavorites.length > 0 && (
            <Section title="Astronomy Objects" icon={Star} count={astronomyFavorites.length}>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {astronomyFavorites.map((obj, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-cosmos-slate p-4 rounded-2xl border border-white/5 hover:border-cosmos-accent/30 transition-all"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <Star size={22} className="text-yellow-400" />
                      <FavBtn onClick={() => toggleFavorite('astronomy', obj.name || obj)} />
                    </div>
                    <p className="font-bold text-base leading-tight">{obj.name || obj}</p>
                    <p className="text-xs text-white/40 mt-1">{obj.type || 'Celestial Object'}</p>
                  </motion.div>
                ))}
              </div>
            </Section>
          )}
        </div>
      )}
    </div>
  );
};

const Section = ({ title, icon: Icon, count, children }) => (
  <section>
    <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
      <Icon size={18} className="text-cosmos-accent shrink-0" />
      {title}
      <span className="text-sm text-white/40 font-normal">({count})</span>
    </h3>
    {children}
  </section>
);

const FavBtn = ({ onClick, size = 16 }) => (
  <button
    onClick={onClick}
    className="p-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors
               min-w-[40px] min-h-[40px] flex items-center justify-center shrink-0"
    aria-label="Remove from favorites"
  >
    <Heart size={size} fill="currentColor" />
  </button>
);

export default MyCosmos;
