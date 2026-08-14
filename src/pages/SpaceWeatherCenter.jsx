import React, { useState, useEffect } from 'react';
import { spaceWeatherService } from '../services/spaceWeather';
import { Activity, AlertTriangle, Info } from 'lucide-react';
import { motion } from 'framer-motion';

/* --- Bar chart – responsive height, never overflows --- */
const ActivityChart = ({ data, title }) => (
  <div className="bg-cosmos-slate p-5 rounded-xl border border-white/5">
    <h3 className="text-xs font-medium text-white/60 uppercase tracking-wider mb-4">{title}</h3>
    {/* Use percentage heights inside a fixed-height container */}
    <div className="flex items-end justify-between h-28 gap-1 overflow-hidden">
      {(data && data.length ? data : [0]).map((height, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${Math.max(2, Math.min(100, height))}%` }}
          transition={{ delay: i * 0.04, duration: 0.5 }}
          className="bg-cosmos-accent w-full rounded-t-sm min-w-0"
        />
      ))}
    </div>
    <p className="text-[10px] text-white/40 mt-3">
      K-index: 0 (quiet) ? 9 (extreme storm)
    </p>
  </div>
);

const SolarAlertCard = ({ alert }) => (
  <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg flex gap-3 items-start">
    <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={18} />
    <div className="min-w-0">
      <h4 className="font-bold text-sm">
        {alert.type}: <span className="text-cosmos-accent">{alert.magnitude}</span>
      </h4>
      <p className="text-xs text-white/60 mt-0.5 break-words">
        {alert.date} · Region {alert.region}
      </p>
    </div>
  </div>
);

const SpaceWeatherCenter = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await spaceWeatherService.getSpaceWeather();
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="h-64 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Activity className="animate-spin text-cosmos-accent" size={40} />
        <p className="text-white/40 text-sm">Syncing with solar telemetry…</p>
      </div>
    </div>
  );

  if (!data) return (
    <div className="p-6 text-center text-white/40">Failed to load space weather data.</div>
  );

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* -- Header -- */}
      <header className="mb-6 md:mb-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-4xl font-bold tracking-tighter"
        >
          SPACE WEATHER
        </motion.h1>
        <p className="text-white/40 text-sm sm:text-base mt-1">
          Monitor real-time solar activity and its impact on Earth.
        </p>
      </header>

      {/* -- Top section: charts + solar level + aurora -- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {/* Geomagnetic chart – full width on mobile, half on md, 2/3 on lg */}
        <div className="md:col-span-1 lg:col-span-1">
          <ActivityChart data={data.geomagneticActivity} title="Geomagnetic Activity (K-Index)" />
        </div>

        {/* Solar activity level */}
        <div className="bg-cosmos-slate p-5 rounded-xl border border-white/5 flex items-center gap-5">
          <div className="w-14 h-14 shrink-0 rounded-full bg-cosmos-accent flex items-center justify-center text-2xl font-bold text-cosmos-black">
            {data.solarActivity.index}
          </div>
          <div>
            <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Solar Activity</p>
            <p className="text-2xl font-bold">{data.solarActivity.level}</p>
            <p className="text-xs text-white/40 mt-1">{data.solarActivity.description}</p>
          </div>
        </div>

        {/* Aurora probability */}
        <div className="bg-cosmos-slate p-5 rounded-xl border border-white/5">
          <h3 className="text-xs font-medium text-white/60 uppercase tracking-wider mb-4">
            Aurora Probability
          </h3>
          <div className="flex justify-between items-center mb-3">
            <span className="text-white/60 text-sm">Probability</span>
            <span className="text-2xl font-bold text-cosmos-accent">
              {data.auroraProbability.probability}%
            </span>
          </div>
          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
            <motion.div
              className="bg-cosmos-accent h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${data.auroraProbability.probability}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <p className="text-xs text-white/40 mt-4">{data.auroraProbability.description}</p>
        </div>
      </div>

      {/* -- Bottom section: flares + explainer -- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-cosmos-slate p-5 rounded-xl border border-white/5">
          <h3 className="text-xs font-medium text-white/60 uppercase tracking-wider mb-4">
            Recent Solar Flares
          </h3>
          <div className="space-y-3">
            {data.solarFlares.map((flare) => (
              <SolarAlertCard key={flare.id} alert={flare} />
            ))}
          </div>
        </div>

        <div className="bg-cosmos-slate p-5 rounded-xl border border-white/10">
          <h3 className="text-xs font-medium text-white/60 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Info size={14} className="shrink-0" /> What does this mean?
          </h3>
          <p className="text-xs text-white/60 leading-relaxed">
            Solar flares and Coronal Mass Ejections (CMEs) are massive explosions on the Sun's surface.
            When they reach Earth, they interact with our magnetic field, creating geomagnetic storms.
            This can trigger beautiful auroras, but can also disrupt GPS signals, power grids,
            and satellite communications.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpaceWeatherCenter;
