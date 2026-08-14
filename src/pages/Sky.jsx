import React, { useState } from 'react';
import { ASTRONOMY_DATA } from '../mock/astronomyData';
import TonightSummary from '../components/dashboard/TonightSummary';
import { Telescope, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Sky = () => {
  const [isNightMode, setIsNightMode] = useState(true);

  return (
    <div
      className={`relative w-full min-h-screen transition-colors duration-1000 ${
        isNightMode ? 'bg-cosmos-black' : 'bg-slate-900'
      } overflow-y-auto`}
    >
      {/* Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none" aria-hidden>
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506318137071-a8e063b4bb8e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale brightness-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cosmos-black" />
        </div>
      </div>

      <div className="relative z-10 p-4 md:p-8 max-w-7xl mx-auto">
        {/* -- Header -- */}
        <header className="mb-6 md:mb-8 flex items-start justify-between gap-4">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-6xl font-bold tracking-tighter text-white"
            >
              SKY
            </motion.h1>
            <p className="text-white/40 text-base sm:text-xl mt-1">What can I see tonight?</p>
          </div>
          <button
            onClick={() => setIsNightMode(!isNightMode)}
            className="bg-white/10 p-3 sm:p-4 rounded-full border border-white/20 hover:bg-white/20
                       transition-all min-w-[48px] min-h-[48px] flex items-center justify-center shrink-0"
            aria-label="Toggle Night Mode"
          >
            <Star className={isNightMode ? 'text-yellow-400' : 'text-white'} size={22} />
          </button>
        </header>

        {/* -- Tonight Summary -- */}
        <TonightSummary />

        {/* -- Bottom cards -- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Constellation Guide */}
          <div className="bg-cosmos-slate/80 p-5 sm:p-8 rounded-3xl border border-white/10 backdrop-blur-md">
            <h2 className="text-xl sm:text-2xl font-bold mb-5 flex items-center gap-3">
              <Telescope className="text-cosmos-accent shrink-0" size={22} />
              Constellation Guide
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ASTRONOMY_DATA.constellations.map((c, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-cosmos-accent/50 transition-all"
                  tabIndex={0}
                >
                  <p className="font-bold text-base">{c.name}</p>
                  <p className="text-sm text-white/40 mt-1">{c.description}</p>
                  <p className="text-[10px] text-cosmos-accent mt-2">{c.region}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Explore stars CTA */}
          <div className="bg-cosmos-slate/80 p-5 sm:p-8 rounded-3xl border border-white/10 backdrop-blur-md flex flex-col justify-center items-center text-center">
            <Star className="text-cosmos-accent mb-5" size={44} />
            <h3 className="text-xl sm:text-2xl font-bold mb-3">Explore the Stars</h3>
            <p className="text-white/40 text-sm sm:text-base mb-6 max-w-sm">
              Real-time star charts and telescope integration are planned for a future release.
              For now, explore the 3D solar system and tonight's sky above.
            </p>
            <Link
              to="/solar-system"
              className="px-6 py-3 bg-cosmos-accent text-cosmos-black font-bold rounded-full
                         hover:bg-white transition-colors text-sm min-h-[48px] flex items-center"
            >
              Explore the Solar System
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sky;
