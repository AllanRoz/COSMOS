import React from 'react';
import { ASTRONOMY_DATA } from '../../mock/astronomyData';
import { Moon, Sun, Sunrise, Sunset, MapPin, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const TonightSummary = () => {
  const { moon, sunrise, sunset, moonRise, moonSet } = ASTRONOMY_DATA;

  return (
    <div className="bg-cosmos-slate/50 p-5 sm:p-8 rounded-3xl border border-white/10 backdrop-blur-md">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-3xl font-bold flex items-center gap-3">
          <Moon className="text-cosmos-accent shrink-0" size={22} />
          Tonight's Sky
        </h2>
        <p className="text-white/40 text-sm mt-1">What's visible in your area</p>
      </div>

      {/* Info row — stack on mobile, 3-col on md */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="space-y-3">
          <InfoRow icon={Sunrise} label={`Sunrise: ${sunrise}`} />
          <InfoRow icon={Sunset}  label={`Sunset: ${sunset}`} />
        </div>
        <div className="space-y-3">
          <InfoRow icon={Moon}  label={`Moon Phase: ${moon.phase}`} />
          <InfoRow icon={Star}  label={`Moonrise: ${moonRise} · Set: ${moonSet}`} />
        </div>
        <div className="space-y-3">
          <InfoRow icon={MapPin} label={ASTRONOMY_DATA.location || 'Current Location'} />
          <InfoRow icon={Sun}    label={`Meteor Showers: ${ASTRONOMY_DATA.meteorShowers}`} />
        </div>
      </div>

      {/* Visible planets + events — 2-col on sm+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <h4 className="text-xs font-bold text-white/60 uppercase tracking-wider mb-3">Visible Planets</h4>
          <div className="space-y-2">
            {ASTRONOMY_DATA.planets.map((planet, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex justify-between items-center p-3 bg-white/5 rounded-lg"
              >
                <span className="font-bold text-sm">{planet.name}</span>
                <span className="text-xs text-white/40 text-right">{planet.visibility}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold text-white/60 uppercase tracking-wider mb-3">Upcoming Events</h4>
          <div className="space-y-2">
            {ASTRONOMY_DATA.events.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex justify-between items-center p-3 bg-white/5 rounded-lg gap-3"
              >
                <div className="min-w-0">
                  <p className="font-bold text-sm">{event.name}</p>
                  <p className="text-[10px] text-white/40">{event.type}</p>
                </div>
                <span className="text-xs text-white/60 shrink-0">{event.date}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-3">
    <Icon size={16} className="text-cosmos-accent shrink-0" />
    <span className="text-white/60 text-sm">{label}</span>
  </div>
);

export default TonightSummary;
