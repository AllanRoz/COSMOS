import React from 'react';
import { ASTRONOMY_DATA } from '../../mock/astronomyData';
import { Moon, Sun, Sunrise, Sunset, MapPin, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const TonightSummary = () => {
  const { moon, sunrise, sunset, moonRise, moonSet } = ASTRONOMY_DATA;

  return (
    <div className="bg-cosmos-slate/50 p-8 rounded-3xl border border-white/10 backdrop-blur-md">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <Moon className="text-cosmos-accent" /> Tonight's Sky
          </h2>
          <p className="text-white/40">What's visible in your area</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Sunrise size={18} className="text-cosmos-accent" />
            <span className="text-white/60">Sunrise: {sunrise}</span>
          </div>
          <div className="flex items-center gap-3">
            <Sunset size={18} className="text-cosmos-accent" />
            <span className="text-white/60">Sunset: {sunset}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Moon size={18} className="text-cosmos-accent" />
            <span className="text-white/60">Moon Phase: {moon.phase}</span>
          </div>
          <div className="flex items-center gap-3">
            <Star size={18} className="text-cosmos-accent" />
            <span className="text-white/60">Moonrise: {moonRise} · Moonset: {moonSet}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <MapPin size={18} className="text-cosmos-accent" />
            <span className="text-white/60">{ASTRONOMY_DATA.location || 'Current Location'}</span>
          </div>
          <div className="flex items-center gap-3">
            <Sun size={18} className="text-cosmos-accent" />
            <span className="text-white/60">Meteor Showers: {ASTRONOMY_DATA.meteorShowers}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-4">Visible Planets</h4>
          <div className="space-y-3">
            {ASTRONOMY_DATA.planets.map((planet, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex justify-between items-center p-3 bg-white/5 rounded-lg"
              >
                <span className="font-bold">{planet.name}</span>
                <span className="text-xs text-white/40">{planet.visibility}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-4">Upcoming Events</h4>
          <div className="space-y-3">
            {ASTRONOMY_DATA.events.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex justify-between items-center p-3 bg-white/5 rounded-lg"
              >
                <div>
                  <p className="font-bold">{event.name}</p>
                  <p className="text-[10px] text-white/40">{event.type}</p>
                </div>
                <span className="text-xs text-white/60">{event.date}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TonightSummary;
