import React, { useState, useEffect } from 'react';
import { missionsService } from '../services/missions';
import { Rocket, MapPin, Info, Calendar, AlertTriangle, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const StatusBadge = ({ status }) => {
  const styles = {
    Scheduled: 'bg-blue-900/30 text-blue-400 border-blue-500/30',
    Completed: 'bg-green-900/30 text-green-400 border-green-500/30',
    In_Progress: 'bg-amber-900/30 text-amber-400 border-amber-500/30',
    Scrubbed: 'bg-red-900/30 text-red-400 border-red-500/30',
  };

  const currentStatus = status.replace(' ', '_');
  const style = styles[currentStatus] || 'bg-white/5 text-white/60 border-white/10';

  const icons = {
    Scheduled: <Calendar size={14} />,
    Completed: <CheckCircle2 size={14} />,
    In_Progress: <Clock size={14} />,
    Scrubbed: <XCircle size={14} />,
  };

  return (
    <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${style}`}>
      {icons[currentStatus] || <Info size={10} />}
      {status}
    </span>
  );
};

const MissionCard = ({ mission }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (new Date(mission.launchDate) > new Date() && mission.status === 'Scheduled') {
      const timer = setInterval(() => {
        const diff = new Date(mission.launchDate) - new Date();
        if (diff <= 0) {
          setTimeLeft('LAUNCHED');
          clearInterval(timer);
        } else {
          const d = Math.floor(diff / (1000 * 60 * 60 * 24));
          const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const s = Math.floor((diff % (1000 * 60)) / 1000);
          setTimeLeft(`${d}d ${h}h ${m}m ${s}s`);
        }
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setTimeLeft(mission.status === 'Completed' ? 'COMPLETED' : mission.status);
    }
  }, [mission.launchDate, mission.status]);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-cosmos-slate p-6 rounded-xl border border-white/5 hover:border-cosmos-accent/50 transition-all group cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="bg-white/5 p-3 rounded-lg group-hover:bg-cosmos-accent group-hover:text-cosmos-black transition-colors">
          <Rocket size={20} />
        </div>
        <StatusBadge status={mission.status} />
      </div>

      <h3 className="text-xl font-bold mb-1">{mission.name}</h3>
      <p className="text-sm text-white/40 mb-4 line-clamp-2">{mission.description}</p>

      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-2 text-xs text-white/60">
          <MapPin size={14} /> {mission.location}
        </div>
        <div className="flex items-center gap-2 text-xs text-white/60">
          <span className="font-medium text-white">{mission.provider}</span>
          <span className="text-white/40">•</span>
          <span>{mission.rocket}</span>
        </div>
      </div>

      <div className="pt-4 border-t border-white/5 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[10px] text-white/40 uppercase tracking-widest">Countdown</span>
          <span className={`text-sm font-mono ${mission.status === 'Scheduled' ? 'text-cosmos-accent' : 'text-white/60'}`}>
            {timeLeft}
          </span>
        </div>
        <Link to={`/missions/${mission.id}`} className="text-cosmos-accent text-sm font-bold hover:underline">
          DETAILS
        </Link>
      </div>
    </motion.div>
  );
};

const Missions = () => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    missionsService.getAllMissions()
      .then(data => {
        console.log('Missions data:', data);
        setMissions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading missions:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredMissions = filter === 'All' 
    ? missions 
    : missions.filter(m => m.status === filter);

  if (loading) return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Rocket className="animate-bounce text-cosmos-accent" size={48} />
        <p className="text-white/40">Synchronizing mission archives...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
        <AlertTriangle className="mx-auto text-red-400 mb-4" size={48} />
        <h2 className="text-xl font-bold text-red-400 mb-2">Failed to Load Missions</h2>
        <p className="text-white/60">{error}</p>
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
          MISSIONS
        </motion.h1>
        <p className="text-white/40">A comprehensive log of humanity's journey into the void.</p>
      </header>

      <div className="flex flex-wrap gap-3 mb-10">
        {['All', 'Scheduled', 'Completed', 'In Progress', 'Scrubbed'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
              filter === f 
              ? 'bg-cosmos-accent text-cosmos-black border-cosmos-accent' 
              : 'border-white/10 hover:border-white/30 text-white/60'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredMissions.length > 0 ? (
            filteredMissions.map(m => (
              <MissionCard key={m.id} mission={m} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <Rocket className="mx-auto text-white/20 mb-4" size={48} />
              <p className="text-white/40">No missions found for this filter.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Missions;
