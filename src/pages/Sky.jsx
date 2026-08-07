import React, { useState } from 'react';
import { ASTRONOMY_DATA } from '../mock/astronomyData';
import TonightSummary from '../components/dashboard/TonightSummary';
import { Telescope, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sky = () => {
  const [isNightMode, setIsNightMode] = useState(true);

  return (
    <div className={`relative w-full min-h-screen transition-colors duration-1000 ${isNightMode ? 'bg-cosmos-black' : 'bg-slate-900'} overflow-y-auto`}>
      {/* Cinematic Background - Mockup for 3D Night Sky Visualization */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506318137071-a8e063b4bb8e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale brightness-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cosmos-black" />
        </div>
      </div>

      <div className="relative z-10 p-8 max-w-7xl mx-auto">
        <header className="mb-8 flex justify-between items-start">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl font-bold tracking-tighter text-white"
            >
              SKY
            </motion.h1>
            <p className="text-white/40 text-xl">What can I see tonight?</p>
          </div>
          <button 
            onClick={() => setIsNightMode(!isNightMode)}
            className="bg-white/10 p-4 rounded-full border border-white/20 hover:bg-white/20 transition-all"
            aria-label="Toggle Night Mode"
          >
            <Star className={isNightMode ? "text-yellow-400" : "text-white"} size={24} />
          </button>
        </header>

        <main className="flex-1 flex flex-col gap-8">
          <TonightSummary />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-cosmos-slate/80 p-8 rounded-3xl border border-white/10 backdrop-blur-md">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Telescope className="text-cosmos-accent" /> Constellation Guide
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ASTRONOMY_DATA.constellations.map((c, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-cosmos-accent/50 transition-all" tabIndex={0}>
                    <p className="font-bold text-lg">{c.name}</p>
                    <p className="text-sm text-white/40">{c.description}</p>
                    <p className="text-[10px] text-cosmos-accent mt-2">{c.region}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-cosmos-slate/80 p-8 rounded-3xl border border-white/10 backdrop-blur-md flex flex-col justify-center items-center text-center">
              <Star className="text-cosmos-accent mb-6" size={48} />
              <h3 className="text-2xl font-bold mb-4">Explore the Stars</h3>
              <p className="text-white/40 mb-8">Our full celestial mapping is coming soon. Connect your telescope to see real-time coordinates of every known celestial body.</p>
              <button className="px-8 py-3 bg-cosmos-accent text-cosmos-black font-bold rounded-full hover:scale-105 transition-transform">
                Join Waitlist
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Sky;
