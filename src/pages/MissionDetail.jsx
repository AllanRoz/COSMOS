import React from 'react';
import { useParams } from 'react-router-dom';
import { MISSION_DATA } from '../mock/missionData';
import { Rocket, MapPin, Info, Calendar, AlertTriangle, CheckCircle2, Clock, XCircle, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useFavorites } from '../context/FavoritesContext';

const MissionDetail = () => {
  const { id } = useParams();
  const mission = MISSION_DATA[id];
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!mission) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold">Mission Not Found</h1>
        <p className="text-white/40 mt-4">The requested mission identifier does not exist in our records.</p>
      </div>
    );
  }

  const isFav = isFavorite('missions', mission.id);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60">
          <XCircle size={24} />
        </button>
        <div className="flex items-center gap-4">
          <h1 className="text-5xl font-bold tracking-tighter">{mission.name}</h1>
          <button 
            onClick={() => toggleFavorite('missions', mission.id)}
            className={`p-2 rounded-full transition-colors ${isFav ? 'bg-cosmos-accent text-cosmos-black' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
          >
            <Heart size={24} fill={isFav ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div className="bg-cosmos-slate p-8 rounded-3xl border border-white/5">
            <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4">Mission Overview</h3>
            <p className="text-lg text-white/80 leading-relaxed">{mission.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-cosmos-slate p-6 rounded-2xl border border-white/5">
              <h3 className="text-xs font-bold text-white/40 uppercase mb-2">Launch Location</h3>
              <p className="text-lg font-bold">{mission.location}</p>
              <div className="flex items-center gap-1 text-cosmos-accent mt-2">
                <MapPin size={14} /> <span className="text-xs">{mission.provider}</span>
              </div>
            </div>

            <div className="bg-cosmos-slate p-6 rounded-2xl border border-white/5">
              <h3 className="text-xs font-bold text-white/40 uppercase mb-2">Rocket Vehicle</h3>
              <p className="text-lg font-bold">{mission.rocket}</p>
              <div className="flex items-center gap-1 text-cosmos-accent mt-2">
                <Calendar size={14} /> <span className="text-xs">{mission.launchDate}</span>
              </div>
            </div>
          </div>

          <div className="bg-cosmos-slate p-8 rounded-3xl border border-white/5">
            <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4">Status Log</h3>
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl">
              <div className="p-3 rounded-full bg-cosmos-accent/20 text-cosmos-accent">
                {mission.status === 'Completed' ? <CheckCircle2 size={24} /> : mission.status === 'Scrubbed' ? <XCircle size={24} /> : mission.status === 'In Progress' ? <Clock size={24} /> : <Calendar size={24} />}
              </div>
              <div>
                <p className="text-xl font-bold">{mission.status}</p>
                <p className="text-white/40 text-sm">Last updated: 2026-08-07 14:30 UTC</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-cosmos-accent/10 p-8 rounded-3xl border border-cosmos-accent/20">
            <h3 className="text-sm font-bold text-cosmos-accent uppercase tracking-widest mb-4">Telemetry Alert</h3>
            <p className="text-sm text-white/70">
              {mission.status === 'Scrubbed' ? 'Mission aborted due to technical anomalies in T-minus 4 hours.' : 
               mission.status === 'In Progress' ? 'Active telemetry stream is currently being processed.' : 
               'Mission is currently in standby for final clearance.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionDetail;
