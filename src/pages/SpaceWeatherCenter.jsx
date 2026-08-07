import React, { useState, useEffect } from 'react';
import { spaceWeatherService } from '../services/spaceWeather';
import { Activity, AlertTriangle, Info, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ActivityChart = ({ data, title }) => (
  <div className="bg-cosmos-slate p-6 rounded-xl border border-white/5">
    <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-6">{title}</h3>
    <div className="flex items-end justify-between h-32 gap-2">
      {[40, 70, 50, 90, 60, 30, 80, 95, 40, 60, 80, 85].map((height, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${height}%` }}
          transition={{ delay: i * 0.05, duration: 0.5 }}
          className="bg-cosmos-accent w-full rounded-t-sm"
        />
      ))}
    </div>
  </div>
);

const SolarAlertCard = ({ alert }) => (
  <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg flex gap-4">
    <AlertTriangle className="text-red-500 shrink-0" size={20} />
    <div>
      <h4 className="font-bold text-sm">{alert.type}: {alert.magnitude}</h4>
      <p className="text-xs text-white/60">{alert.date} • Region {alert.region}</p>
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
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Activity className="animate-spin text-cosmos-accent" size={48} />
        <p className="text-white/40">Syncing with solar telemetry...</p>
      </div>
    </div>
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold tracking-tighter"
        >
          SPACE WEATHER
        </motion.h1>
        <p className="text-white/40">Monitor real-time solar activity and its impact on Earth.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <ActivityChart data={data.geomagneticActivity} title="Geomagnetic Activity (K-Index)" />
          <div className="bg-cosmos-slate p-6 rounded-xl border border-white/5">
            <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-6">Solar Activity Level</h3>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-cosmos-accent flex items-center justify-center text-2xl font-bold">
                {data.solarActivity.index}
              </div>
              <div>
                <p className="text-3xl font-bold">{data.solarActivity.level}</p>
                <p className="text-sm text-white/40 mt-1">{data.solarActivity.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-cosmos-slate p-6 rounded-xl border border-white/5">
          <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-6">Aurora Probability</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-white/60">Probability</span>
              <span className="text-2xl font-bold text-cosmos-accent">{data.auroraProbability.probability}%</span>
            </div>
            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
              <motion.div 
                className="bg-cosmos-accent h-full"
                initial={{ width: 0 }}
                animate={{ width: `${data.auroraProbability.probability}%` }}
              />
            </div>
            <p className="text-sm text-white/40 mt-4">{data.auroraProbability.description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-2">
          <div className="bg-cosmos-slate p-6 rounded-xl border border-white/5">
            <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-6">Recent Solar Flares</h3>
            <div className="space-y-4">
              {data.solarFlares.map((flare) => (
                <SolarAlertCard key={flare.id} alert={flare} />
              ))}
            </div>
          </div>
        </div>

        <div className="bg-cosmos-slate p-6 rounded-xl border border-white/10">
          <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Info size={16} /> WHAT DOES THIS MEAN?
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
