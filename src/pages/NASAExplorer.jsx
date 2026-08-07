import React, { useState, useEffect } from 'react';
import { nasaService } from '../services/nasa';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Loader2, AlertCircle } from 'lucide-react';

const NASAExplorer = () => {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);

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
    if (!searchQuery) return;
    
    setLoading(true);
    try {
      const results = await nasaService.searchImages(searchQuery);
      setImages(results);
    } catch (err) {
      console.error(err);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold tracking-tighter"
        >
          NASA EXPLORER
        </motion.h1>
        <p className="text-white/40">Discover the wonders of our universe through the eyes of NASA.</p>
      </header>

      {/* APOD Section */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-96">
          <Loader2 className="animate-spin text-cosmos-accent mb-4" size={48} />
          <p className="text-white/40">Fetching cosmic data...</p>
        </div>
      ) : error ? (
        <div className="bg-red-900/20 border border-red-500/50 p-6 rounded-xl mb-8 flex items-center gap-4">
          <AlertCircle className="text-red-500" />
          <p>{error}</p>
        </div>
      ) : (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <ImageIcon className="text-cosmos-accent" /> Astronomy Picture of the Day
          </h2>
          <div className="bg-cosmos-slate rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
            {apod && (
              <>
                <img 
                  src={apod.url} 
                  alt={apod.title} 
                  className="w-full h-auto max-h-[600px] object-cover"
                />
                <div className="p-8 bg-cosmos-slate">
                  <h3 className="text-2xl font-bold mb-4">{apod.title}</h3>
                  <p className="text-white/70 leading-relaxed">{apod.explanation}</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Image Library Search */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <ImageIcon className="text-cosmos-accent" /> Image Library
        </h2>
        <form onSubmit={handleSearch} className="mb-8 relative">
          <input 
            type="text"
            placeholder="Search NASA's image library (e.g., 'Mars Rover', 'Nebula', 'Saturn')..."
            className="w-full bg-cosmos-slate border border-white/10 rounded-xl px-6 py-4 pr-24 focus:outline-none focus:border-cosmos-accent transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-cosmos-accent text-cosmos-black px-4 py-2 rounded-lg font-bold hover:bg-white transition-colors"
          >
            Search
          </button>
        </form>

        {loading && <div className="flex justify-center py-20"><Loader2 className="animate-spin text-cosmos-accent" size={48} /></div>}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {images.map((img, index) => (
              <motion.div
                key={img.title || index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative bg-cosmos-slate rounded-xl overflow-hidden border border-white/5"
              >
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-cosmos-slate to-transparent">
                  <p className="text-sm font-bold line-clamp-2">{img.title}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {!loading && images.length === 0 && searchQuery && (
            <p className="col-span-full text-center text-white/40 py-10">No images found for your search.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NASAExplorer;
