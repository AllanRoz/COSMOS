import React, { useState, useEffect } from 'react';
import { nasaService } from '../services/nasa';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Loader2, AlertCircle, Search } from 'lucide-react';

const NASAExplorer = () => {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await nasaService.getApod();
        setApod(data);
      } catch (err) {
        setError('Failed to load Astronomy Picture of the Day.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setSearchLoading(true);
    setSearchError(null);
    try {
      const results = await nasaService.searchImages(searchQuery);
      setImages(results);
      if (results.length === 0) {
        setSearchError('No images found for your search. Try a different term.');
      }
    } catch (err) {
      console.error(err);
      setImages([]);
      setSearchError('Image search failed. The NASA image library may be unavailable right now.');
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* -- Header -- */}
      <header className="mb-6 md:mb-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-4xl font-bold tracking-tighter"
        >
          NASA EXPLORER
        </motion.h1>
        <p className="text-white/40 text-sm sm:text-base mt-1">
          Discover the wonders of our universe through the eyes of NASA.
        </p>
      </header>

      {/* -- APOD -- */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <Loader2 className="animate-spin text-cosmos-accent mb-4" size={40} />
          <p className="text-white/40 text-sm">Fetching cosmic data…</p>
        </div>
      ) : error ? (
        <div className="bg-red-900/20 border border-red-500/50 p-5 rounded-xl mb-8 flex items-center gap-4">
          <AlertCircle className="text-red-500 shrink-0" size={20} />
          <p className="text-sm">{error}</p>
        </div>
      ) : apod ? (
        <div className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-5 flex items-center gap-2">
            <ImageIcon className="text-cosmos-accent shrink-0" size={20} />
            Astronomy Picture of the Day
          </h2>
          <div className="bg-cosmos-slate rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
            {apod.media_type === 'video' ? (
              <div className="aspect-video bg-cosmos-black flex items-center justify-center p-6">
                <a
                  href={apod.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cosmos-accent font-bold hover:underline text-sm sm:text-base text-center"
                >
                  ? Watch today's APOD video (opens in new tab)
                </a>
              </div>
            ) : (
              <img
                src={apod.url}
                alt={apod.title}
                className="w-full h-auto max-h-[500px] object-cover"
                loading="lazy"
              />
            )}
            <div className="p-5 sm:p-8">
              <h3 className="text-lg sm:text-2xl font-bold mb-3">{apod.title}</h3>
              <p className="text-white/70 leading-relaxed text-sm sm:text-base">{apod.explanation}</p>
            </div>
          </div>
        </div>
      ) : null}

      {/* -- Image Library Search -- */}
      <div className="mb-12">
        <h2 className="text-xl sm:text-2xl font-bold mb-5 flex items-center gap-2">
          <ImageIcon className="text-cosmos-accent shrink-0" size={20} />
          Image Library
        </h2>

        {/* Search form — stacked on mobile so the button is full-width below */}
        <form onSubmit={handleSearch} className="mb-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search: Mars Rover, Nebula, Saturn…"
              className="w-full bg-cosmos-slate border border-white/10 rounded-xl pl-10 pr-4 py-3.5
                         focus:outline-none focus:border-cosmos-accent transition-colors text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-cosmos-accent text-cosmos-black px-6 py-3.5 rounded-xl font-bold
                       hover:bg-white transition-colors text-sm min-h-[52px] shrink-0"
          >
            Search
          </button>
        </form>

        {searchLoading && (
          <div className="flex justify-center py-16">
            <Loader2 className="animate-spin text-cosmos-accent" size={40} />
          </div>
        )}

        {searchError && !searchLoading && (
          <div className="bg-yellow-900/20 border border-yellow-500/30 p-4 rounded-xl mb-6 text-yellow-400 text-sm">
            {searchError}
          </div>
        )}

        {/* Image grid: 1 col mobile, 2 col sm, 3 col lg, 4 col xl */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence>
            {images.map((img, index) => (
              <motion.div
                key={img.nasaId || img.title || index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group relative bg-cosmos-slate rounded-xl overflow-hidden border border-white/5"
              >
                <div className="w-full aspect-video overflow-hidden bg-white/5">
                  {img.url ? (
                    <img
                      src={img.url}
                      alt={img.title}
                      loading="lazy"
                      onError={(e) => { e.target.style.display = 'none'; }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : null}
                </div>
                <div className="p-3">
                  <p className="text-sm font-bold line-clamp-2">{img.title}</p>
                  {img.date && <p className="text-[10px] text-white/40 mt-1">{img.date}</p>}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {!searchLoading && !searchError && images.length === 0 && searchQuery && (
            <p className="col-span-full text-center text-white/40 py-10">
              No images found for &ldquo;{searchQuery}&rdquo;
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NASAExplorer;
