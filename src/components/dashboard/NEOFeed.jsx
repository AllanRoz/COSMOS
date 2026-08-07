import React, { useState, useEffect } from 'react';
import { nasaService } from '../../services/nasa';
import { AlertTriangle } from 'lucide-react';

const NEOFeed = () => {
  const [neoData, setNeoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNeo = async () => {
      try {
        setLoading(true);
        // Fetch NEOs for today
        const today = new Date().toISOString().split('T')[0];
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
    fetchNeo();
  }, []);

  if (loading) return <div className="h-24 flex items-center justify-center text-white/40">Updating NEO Feed...</div>;
  if (error) return <div className="h-24 flex items-center justify-center text-red-500 text-sm">{error}</div>;

  return (
    <div className="space-y-3">
      {neoData.length > 0 ? (
        neoData.map((neo) => (
          <div key={neo.id} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0">
            <div>
              <p className="font-bold text-sm">{neo.name}</p>
              <p className="text-[10px] text-white/40">{neo.miss_distance_km.toLocaleString()} km from Earth</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/60">{neo.velocity_ms_avg.toFixed(1)} m/s</span>
              {neo.is_potentially_hazardous_pct > 0 && (
                <span className="text-red-500 flex items-center gap-1 text-[10px] font-bold">
                  <AlertTriangle size={12} /> HAZARDOUS
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
