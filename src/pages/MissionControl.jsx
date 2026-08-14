import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  Moon,
  Navigation,
  Activity,
  Rocket,
  AlertTriangle,
  Image as ImageIcon,
  FlaskConical
} from 'lucide-react';
import { dashboardData } from '../mock/dashboardData';
import NEOFeed from '../components/dashboard/NEOFeed';

const Card = ({ title, children, icon: Icon, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-cosmos-slate p-5 rounded-xl border border-white/5 ${className}`}
  >
    <div className="flex items-center gap-2 mb-3">
      {Icon && <Icon className="text-cosmos-accent shrink-0" size={18} />}
      <h3 className="text-xs font-medium text-white/60 uppercase tracking-wider">{title}</h3>
    </div>
    {children}
  </motion.div>
);

const MissionControl = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* -- Page header -- */}
      <header className="mb-6 md:mb-10">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl sm:text-4xl font-bold tracking-tighter"
            >
              MISSION CONTROL
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/40 text-sm sm:text-base"
            >
              Explore the universe.
            </motion.p>
          </div>
          {/* Telemetry badge — wraps gracefully on narrow screens */}
          <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-full border border-white/10 self-start">
            <FlaskConical size={13} className="text-cosmos-accent shrink-0" />
            <span className="text-[11px] text-white/40">Demo data – live API feeds marked separately</span>
          </div>
        </div>
      </header>

      {/* -- Stat cards row -- */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card title="Current Time (UTC)" icon={Zap}>
          <p className="text-2xl md:text-3xl font-bold tabular-nums">
            {now.toLocaleTimeString('en-GB', { timeZone: 'UTC' })}
          </p>
          <p className="text-xs text-white/40 mt-1">
            {now.toLocaleDateString('en-GB', { timeZone: 'UTC' })}
          </p>
        </Card>

        <Card title="Moon Phase" icon={Moon}>
          <p className="text-xl md:text-3xl font-bold leading-tight">{dashboardData.moonPhase}</p>
        </Card>

        <Card title="Distance to Moon" icon={Navigation}>
          <p className="text-xl md:text-3xl font-bold leading-tight">{dashboardData.distanceToMoon}</p>
        </Card>

        <Card title="Solar Activity" icon={Activity}>
          <p className="text-xl md:text-3xl font-bold">{dashboardData.solarActivity.level}</p>
          <p className="text-xs text-white/40 mt-1 line-clamp-2">{dashboardData.solarActivity.description}</p>
        </Card>
      </div>

      {/* -- Main grid -- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* ISS Status */}
          <Card title="ISS Status" icon={Navigation}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] uppercase tracking-wider bg-white/5 border border-white/10
                               px-2 py-0.5 rounded-full text-white/40">
                Demo telemetry
              </span>
            </div>
            {/* 2-col on mobile, 4-col on md+ */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Location', value: `${dashboardData.issLocation.lat}, ${dashboardData.issLocation.lng}` },
                { label: 'Altitude',  value: dashboardData.issLocation.altitude },
                { label: 'Velocity',  value: dashboardData.issLocation.velocity },
                { label: 'Next Pass', value: dashboardData.nextIssPass, accent: true },
              ].map(({ label, value, accent }) => (
                <div key={label}>
                  <p className="text-sm text-white/40 mb-1">{label}</p>
                  <p className={`text-base md:text-xl font-bold break-words ${accent ? 'text-cosmos-accent' : ''}`}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* NEO Feed */}
          <Card title="Near Earth Objects" icon={AlertTriangle}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] uppercase tracking-wider bg-green-500/10 border border-green-500/30
                               px-2 py-0.5 rounded-full text-green-400">
                Live NASA API
              </span>
            </div>
            <NEOFeed />
          </Card>
        </div>

        <div className="space-y-6">
          {/* Upcoming Launch */}
          <Card title="Upcoming Launch" icon={Rocket}>
            <div className="space-y-2">
              <p className="text-lg font-bold">{dashboardData.upcomingLaunch.name}</p>
              <p className="text-sm text-white/60">{dashboardData.upcomingLaunch.provider}</p>
              <p className="text-sm text-white/60">{dashboardData.upcomingLaunch.date}</p>
              <span className="inline-block px-2 py-1 rounded bg-green-900/30 text-green-400 text-xs font-bold">
                {dashboardData.upcomingLaunch.status}
              </span>
            </div>
          </Card>

          {/* APOD */}
          <Card title="Astronomy Picture of the Day" icon={ImageIcon}>
            <div className="aspect-video bg-cosmos-gray rounded-lg mb-3 overflow-hidden">
              <img
                src={dashboardData.apod.url}
                alt={dashboardData.apod.title}
                className="w-full h-full object-cover opacity-50"
                loading="lazy"
              />
            </div>
            <p className="text-sm font-bold">{dashboardData.apod.title}</p>
            <p className="text-xs text-white/60 line-clamp-2 mt-1">{dashboardData.apod.explanation}</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MissionControl;
