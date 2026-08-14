import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import Globe from '../components/three/Globe';
import { RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';

const ISS_API = 'https://api.wheretheiss.at/v1/satellites/25544';

const latLngToPosition = (lat, lng, radius = 10) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return {
    x: -radius * Math.sin(phi) * Math.cos(theta),
    y: radius * Math.cos(phi),
    z: radius * Math.sin(phi) * Math.sin(theta),
  };
};

const SatelliteTracker = () => {
  const [issPos, setIssPos] = useState({ x: 0, y: 0, z: 0 });
  const [telemetry, setTelemetry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [telemetryExpanded, setTelemetryExpanded] = useState(true);

  const fetchISS = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await fetch(ISS_API);
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      const data = await response.json();
      const lat = parseFloat(data.latitude);
      const lng = parseFloat(data.longitude);
      setTelemetry({
        lat,
        lng,
        altitude: data.altitude ? `${Math.round(data.altitude)} km` : null,
        velocity: data.velocity ? `${Math.round(data.velocity / 1000 * 10) / 10} km/s` : null,
        timestamp: data.timestamp,
      });
      setIssPos(latLngToPosition(lat, lng));
    } catch (err) {
      console.error('Failed to fetch ISS position', err);
      setError('Unable to reach ISS telemetry. The live feed may be temporarily unavailable.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchISS();
    const interval = setInterval(fetchISS, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[calc(100vh-56px)] md:h-screen bg-cosmos-black">

      {/* -- Desktop title (top-left overlay) -- */}
      <div className="hidden md:block absolute top-8 left-8 z-10 pointer-events-none">
        <h1 className="text-4xl font-bold tracking-tighter text-white">SATELLITE TRACKER</h1>
        <p className="text-white/40">Real-time orbital monitoring</p>
      </div>

      {/* -- Desktop telemetry panel (top-right) -- */}
      <div className="hidden md:block absolute top-8 right-8 z-10 bg-cosmos-slate/80 p-6 rounded-xl border border-white/10 backdrop-blur-md max-w-xs">
        <TelemetryContent
          loading={loading}
          error={error}
          telemetry={telemetry}
          onRetry={fetchISS}
        />
      </div>

      {/* -- Mobile telemetry panel (bottom collapsible) -- */}
      <div className="md:hidden absolute bottom-0 left-0 right-0 z-10 bg-cosmos-slate/95 backdrop-blur-md border-t border-white/10 rounded-t-2xl">
        <button
          onClick={() => setTelemetryExpanded(!telemetryExpanded)}
          className="w-full flex items-center justify-between px-5 py-3 min-h-[52px]"
          aria-label={telemetryExpanded ? 'Collapse telemetry' : 'Expand telemetry'}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-bold text-cosmos-accent">LIVE TELEMETRY</span>
          </div>
          {telemetryExpanded ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
        </button>
        {telemetryExpanded && (
          <div className="px-5 pb-4">
            <TelemetryContent
              loading={loading}
              error={error}
              telemetry={telemetry}
              onRetry={fetchISS}
              mobile
            />
          </div>
        )}
      </div>

      {/* -- Globe canvas -- */}
      <Canvas dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: 'high-performance' }}>
        <PerspectiveCamera makeDefault position={[0, 20, 40]} />
        <OrbitControls
          makeDefault
          enablePan={false}
          touches={{ ONE: 2, TWO: 512 }}
        />
        <ambientLight intensity={0.6} />
        <directionalLight position={[15, 10, 5]} intensity={1.2} />
        <Stars />
        <Suspense fallback={null}>
          <Globe />
        </Suspense>

        {/* ISS Marker */}
        {telemetry && (
          <mesh position={[issPos.x, issPos.y, issPos.z]}>
            <sphereGeometry args={[0.35, 12, 12]} />
            <meshBasicMaterial color="#ff3b30" />
          </mesh>
        )}
      </Canvas>
    </div>
  );
};

const TelemetryContent = ({ loading, error, telemetry, onRetry, mobile }) => (
  <>
    <h3 className={`font-bold text-cosmos-accent uppercase mb-3 ${mobile ? 'sr-only' : 'text-sm'}`}>
      Live Telemetry
    </h3>
    {loading && !telemetry ? (
      <p className="text-white/40 text-sm">Syncing with ground station…</p>
    ) : error ? (
      <div className="space-y-3">
        <p className="text-red-400 text-sm">{error}</p>
        <button
          onClick={onRetry}
          className="flex items-center gap-2 text-xs text-cosmos-accent hover:underline min-h-[44px]"
        >
          <RefreshCw size={14} /> Retry Connection
        </button>
      </div>
    ) : telemetry ? (
      <div className={mobile ? 'grid grid-cols-2 gap-3' : 'space-y-2'}>
        <TelItem label="Status" value="ACTIVE" accent />
        <TelItem label="Latitude" value={`${telemetry.lat.toFixed(2)}°`} />
        <TelItem label="Longitude" value={`${telemetry.lng.toFixed(2)}°`} />
        {telemetry.altitude && <TelItem label="Altitude" value={telemetry.altitude} />}
        {telemetry.velocity && <TelItem label="Velocity" value={telemetry.velocity} />}
        <p className="text-[10px] text-white/40 col-span-2 mt-1">
          Updated: {new Date(telemetry.timestamp * 1000).toLocaleTimeString()}
        </p>
      </div>
    ) : null}
  </>
);

const TelItem = ({ label, value, accent }) => (
  <div>
    <p className="text-[10px] text-white/40 uppercase">{label}</p>
    <p className={`text-sm font-bold ${accent ? 'text-green-400' : 'text-white'}`}>{value}</p>
  </div>
);

export default SatelliteTracker;
