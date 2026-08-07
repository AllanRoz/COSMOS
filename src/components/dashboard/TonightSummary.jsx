import React, { useState } from 'react';
import { ASTRONOMY_DATA } from '../../mock/astronomyData';
import { Moon, Sun, Sunrise, Sunset, MapPin, Telescope, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TonightSummary = () => {
  const [location, setLocation] = useState('');

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
            <span className="text-white/60">Sunrise: 06:15 AM</span>
          </div>
          <div className="flex items-center gap-3">
            <Sunset size={18} className="text-cosmos-accent" />
            <span className="text-white/60">Sunset: 08:45 PM</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Moon size={18} className="text-cosmos-accent" />
            <span className="text-white/60">Moon Phase: {ASTRONOMY_DATA.moon.phase}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white/60">Moonrise: {ASTRONOMY_DATA.moon.rise}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <MapPin size={18} className="text-cosmos-accent" />
            <input 
              type="text" 
              placeholder="Enter location..." 
              className="bg-transparent border-b border-white/20 focus:border-cosmos-accent outline-none text-sm w-full"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-4">Visible Planets</h4>
          <div className="space-y-3">
            {ASTRONOMY_DATA.planets.map((planet, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <span className="font-bold">{planet.name}</span>
                <span className="text-xs text-white/40">{planet.visibility}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-4">Upcoming Events</h4>
          <div className="space-y-3">
            {ASTRONOMY_DATA.events.map((event, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <div>
                  <p className="font-bold">{event.name}</p>
                  <p className="text-[10px] text-white/40">{event.type}</p>
                </div>
                <span className="text-xs text-white/60">{event.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TonightSummary;
