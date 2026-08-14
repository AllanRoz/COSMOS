import React, { useState, useEffect } from 'react';
import { nasaService } from '../../services/nasa';
import { AlertTriangle, RefreshCw } from 'lucide-react';

const NEOFeed = () => {
  const [neoData, setNeoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNeo = async () => {
    try {
      setLoading(true);
      setError(null);
      const today     = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      const data = await nasaService.getNeo(yesterday, today);
      setNeoData(data);
    } catch (err) {
      setError('Failed to fetch Near-Earth Objects.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNeo(); }, []);

  if (loading) return (
    <div className="h-16 flex items-center justify-center text-white/40 text-sm">
      Updating NEO Feed…
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center gap-3 py-4">
      <p className="text-red-500 text-sm">{error}</p>
      <button
        onClick={fetchNeo}
        className="flex items-center gap-2 text-xs text-cosmos-accent hover:underline min-h-[44px] px-3"
      >
        <RefreshCw size={13} /> Retry
      </button>
    </div>
  );

  return (
    <div className="space-y-3">
      {neoData.length > 0 ? (
        neoData.slice(0, 6).map((neo) => (
          <div
            key={neo.id}
            className="flex flex-wrap items-center justify-between gap-2
                       border-b border-white/5 pb-3 last:border-0 last:pb-0"
          >
            <div className="min-w-0">
              <p className="font-bold text-sm truncate">{neo.name}</p>
              <p className="text-[10px] text-white/40 mt-0.5">
                {neo.missDistanceKm
                  ? `${Math.round(Number(neo.missDistanceKm)).toLocaleString()} km from Earth`
                  : 'Distance unknown'}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[11px] text-white/60">
                {neo.velocityKmS ? `${Number(neo.velocityKmS).toFixed(1)} km/s` : ''}
              </span>
              {neo.isHazardous && (
                <span className="text-red-500 flex items-center gap-1 text-[10px] font-bold">
                  <AlertTriangle size={12} /> HAZ
                </span>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-white/40 text-sm">No objects detected for current period.</p>
      )}
    </div>
  );
};

export default NEOFeed;
