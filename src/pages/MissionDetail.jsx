import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MISSION_DATA } from '../mock/missionData';
import { MapPin, Calendar, CheckCircle2, Clock, XCircle, Heart, ArrowLeft } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

const MissionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const mission = MISSION_DATA[id];
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!mission) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold">Mission Not Found</h1>
        <p className="text-white/40 mt-3 text-sm">The requested mission does not exist in our records.</p>
        <Link to="/missions" className="inline-block mt-5 text-cosmos-accent font-bold hover:underline">
          Back to Missions
        </Link>
      </div>
    );
  }

  const isFav = isFavorite('missions', mission.id);
  const lastUpdated = new Date().toISOString().slice(0, 16).replace('T', ' ').concat(' UTC');

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      {/* -- Back button + title -- */}
      <div className="flex items-start gap-3 mb-6 md:mb-8">
        <button
          onClick={() => navigate('/missions')}
          className="p-2 mt-1 rounded-full bg-white/5 hover:bg-white/10 text-white/60 shrink-0
                     min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Back to missions"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tighter break-words leading-tight">
            {mission.name}
          </h1>
        </div>
        <button
          onClick={() => toggleFavorite('missions', mission.id)}
          className={`p-2 mt-1 rounded-full transition-colors shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center ${
            isFav ? 'bg-cosmos-accent text-cosmos-black' : 'bg-white/5 text-white/60 hover:bg-white/10'
          }`}
          aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart size={20} fill={isFav ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* -- Content grid -- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
        <div className="md:col-span-2 space-y-5">
          {/* Overview */}
          <div className="bg-cosmos-slate p-5 sm:p-8 rounded-3xl border border-white/5">
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Mission Overview</h3>
            <p className="text-base text-white/80 leading-relaxed">{mission.description}</p>
          </div>

          {/* Location + rocket — 2-col */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-cosmos-slate p-5 rounded-2xl border border-white/5">
              <h3 className="text-xs font-bold text-white/40 uppercase mb-2">Launch Location</h3>
              <p className="text-base font-bold">{mission.location}</p>
              <div className="flex items-center gap-1 text-cosmos-accent mt-2">
                <MapPin size={13} />
                <span className="text-xs">{mission.provider}</span>
              </div>
            </div>
            <div className="bg-cosmos-slate p-5 rounded-2xl border border-white/5">
              <h3 className="text-xs font-bold text-white/40 uppercase mb-2">Rocket Vehicle</h3>
              <p className="text-base font-bold">{mission.rocket}</p>
              <div className="flex items-center gap-1 text-cosmos-accent mt-2">
                <Calendar size={13} />
                <span className="text-xs">{mission.launchDate}</span>
              </div>
            </div>
          </div>

          {/* Status log */}
          <div className="bg-cosmos-slate p-5 sm:p-8 rounded-3xl border border-white/5">
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Status Log</h3>
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl">
              <div className="p-3 rounded-full bg-cosmos-accent/20 text-cosmos-accent shrink-0">
                {mission.status === 'Completed'   ? <CheckCircle2 size={22} /> :
                 mission.status === 'Scrubbed'    ? <XCircle size={22} /> :
                 mission.status === 'In Progress' ? <Clock size={22} /> :
                                                    <Calendar size={22} />}
              </div>
              <div>
                <p className="text-lg font-bold">{mission.status}</p>
                <p className="text-white/40 text-xs mt-0.5">Last updated: {lastUpdated}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="bg-cosmos-accent/10 p-5 sm:p-8 rounded-3xl border border-cosmos-accent/20">
            <h3 className="text-xs font-bold text-cosmos-accent uppercase tracking-widest mb-3">Telemetry Alert</h3>
            <p className="text-sm text-white/70">
              {mission.status === 'Scrubbed'    ? 'Mission aborted due to technical anomalies in T-minus 4 hours.' :
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
