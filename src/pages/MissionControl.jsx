import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Moon, 
  Sun, 
  Navigation, 
  Activity, 
  Rocket, 
  AlertTriangle,
  Image as ImageIcon
} from 'lucide-react';
import { dashboardData } from '../mock/dashboardData';
import NEOFeed from '../components/dashboard/NEOFeed';

const Card = ({ title, children, icon: Icon, className = "" }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-cosmos-slate p-6 rounded-xl border border-white/5 ${className}`}
  >
    <div className="flex items-center gap-3 mb-4">
      {Icon && <Icon className="text-cosmos-accent" size={20} />}
      <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider">{title}</h3>
    </div>
    {children}
  </motion.div>
);

const MissionControl = () => {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <header className="mb-6 md:mb-10">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl font-bold tracking-tighter"
        >
          MISSION CONTROL
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-white/40"
        >
          Explore the universe.
        </motion.p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card title="Current Time (UTC)" icon={Zap}>
          <p className="text-3xl font-bold">{new Date(dashboardData.currentTime).toLocaleTimeString()}</p>
        </Card>

        <Card title="Moon Phase" icon={Moon}>
          <p className="text-3xl font-bold">{dashboardData.moonPhase}</p>
        </Card>

        <Card title="Distance to Moon" icon={Navigation}>
          <p className="text-3xl font-bold">{dashboardData.distanceToMoon}</p>
        </Card>

        <Card title="Solar Activity" icon={Activity}>
          <div className="flex flex-col">
            <p className="text-3xl font-bold">{dashboardData.solarActivity.level}</p>
            <p className="text-xs text-white/40">{dashboardData.solarActivity.description}</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card title="ISS Status" icon={Navigation} className="mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-white/40 mb-1">Location</p>
                <p className="text-xl font-bold">{dashboardData.issLocation.lat}, {dashboardData.issLocation.lng}</p>
              </div>
              <div>
                <p className="text-sm text-white/40 mb-1">Altitude</p>
                <p className="text-xl font-bold">{dashboardData.issLocation.altitude}</p>
              </div>
              <div>
                <p className="text-sm text-white/40 mb-1">Velocity</p>
                <p className="text-xl font-bold">{dashboardData.issLocation.velocity}</p>
              </div>
              <div>
                <p className="text-sm text-white/40 mb-1">Next Pass</p>
                <p className="text-xl font-bold text-cosmos-accent">{dashboardData.nextIssPass}</p>
              </div>
            </div>
          </Card>

          <Card title="Near Earth Objects" icon={AlertTriangle}>
            <NEOFeed />
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Upcoming Launch" icon={Rocket}>
            <div className="space-y-3">
              <p className="text-xl font-bold">{dashboardData.upcomingLaunch.name}</p>
              <p className="text-sm text-white/60">{dashboardData.upcomingLaunch.provider}</p>
              <p className="text-sm text-white/60">{dashboardData.upcomingLaunch.date}</p>
              <span className="inline-block px-2 py-1 rounded bg-green-900/30 text-green-400 text-xs font-bold">
                {dashboardData.upcomingLaunch.status}
              </span>
            </div>
          </Card>

          <Card title="Astronomy Picture of the Day" icon={ImageIcon}>
            <div className="aspect-video bg-cosmos-slate rounded-lg mb-3 overflow-hidden">
              <img 
                src={dashboardData.apod.url} 
                alt={dashboardData.apod.title} 
                className="w-full h-full object-cover opacity-50"
              />
            </div>
            <p className="text-sm font-bold">{dashboardData.apod.title}</p>
            <p className="text-xs text-white/60 line-clamp-2">{dashboardData.apod.explanation}</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MissionControl;
