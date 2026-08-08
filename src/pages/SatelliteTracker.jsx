import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import Globe from '../components/three/Globe';
import { RefreshCw } from 'lucide-react';

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
    <div className="w-full h-screen bg-cosmos-black relative">
      <div className="absolute top-8 left-8 z-10">
        <h1 className="text-4xl font-bold tracking-tighter text-white">SATELLITE TRACKER</h1>
        <p className="text-white/40">Real-time orbital monitoring</p>
      </div>

      <div className="absolute top-8 right-8 z-10 bg-cosmos-slate/80 p-6 rounded-xl border border-white/10 backdrop-blur-md">
        <h3 className="text-sm font-bold mb-4 text-cosmos-accent uppercase">Live Telemetry</h3>
        {loading && !telemetry ? (
          <p className="text-white/40">Syncing with ground station...</p>
        ) : error ? (
          <div className="space-y-3">
            <p className="text-red-400 text-sm">{error}</p>
            <button
              onClick={fetchISS}
              className="flex items-center gap-2 text-xs text-cosmos-accent hover:underline"
            >
              <RefreshCw size={12} /> Retry Connection
            </button>
          </div>
        ) : telemetry ? (
          <div className="space-y-2">
            <p className="text-sm">ISS Status: <span className="text-green-400">ACTIVE</span></p>
            <p className="text-sm">Latitude: {telemetry.lat.toFixed(2)}°</p>
            <p className="text-sm">Longitude: {telemetry.lng.toFixed(2)}°</p>
            {telemetry.altitude && <p className="text-sm">Altitude: {telemetry.altitude}</p>}
            {telemetry.velocity && <p className="text-sm">Velocity: {telemetry.velocity}</p>}
            <p className="text-[10px] text-white/40 mt-2">
              Last update: {new Date(telemetry.timestamp * 1000).toLocaleTimeString()}
            </p>
          </div>
        ) : null}
      </div>

      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 20, 40]} />
        <OrbitControls makeDefault />
        <ambientLight intensity={0.6} />
        <directionalLight position={[15, 10, 5]} intensity={1.2} />
        <Stars />
        <Suspense fallback={null}>
          <Globe />
        </Suspense>
        
        {/* ISS Marker */}
        {telemetry && (
          <mesh position={[issPos.x, issPos.y, issPos.z]}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshBasicMaterial color="#ff3b30" />
          </mesh>
        )}
      </Canvas>
    </div>
  );
};

export default SatelliteTracker;
