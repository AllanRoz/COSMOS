import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import Globe from '../components/three/Globe';

const SatelliteTracker = () => {
  const [issPos, setIssPos] = useState({ x: 0, y: 0, z: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchISS = async () => {
      try {
        const response = await fetch('http://api.open-notify.org/iss-now.json');
        const data = await response.json();
        const lat = data.iss_position.latitude;
        const lng = data.iss_position.longitude;
        
        // Convert Lat/Lng to 3D coordinates (Simplified)
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lng + 180) * (Math.PI / 180);
        const radius = 10; // Matching globe radius

        setIssPos({
          x: -radius * Math.sin(phi) * Math.cos(theta),
          y: radius * Math.cos(phi),
          z: radius * Math.sin(phi) * Math.sin(theta),
        });
      } catch (err) {
        console.error('Failed to fetch ISS position', err);
      } finally {
        setLoading(false);
      }
    };

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
        {loading ? (
          <p className="text-white/40">Syncing with ground station...</p>
        ) : (
          <div className="space-y-2">
            <p className="text-sm">ISS Status: <span className="text-green-400">ACTIVE</span></p>
            <p className="text-sm">Latitude: {issPos.y.toFixed(2)}°</p>
            <p className="text-sm">Longitude: {issPos.x.toFixed(2)}°</p>
          </div>
        )}
      </div>

      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 20, 40]} />
        <OrbitControls makeDefault />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <Stars />
        <Globe />
        
        {/* ISS Marker */}
        <mesh position={[issPos.x, issPos.y, issPos.z]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial color="#ff0000" />
        </mesh>
      </Canvas>
    </div>
  );
};

export default SatelliteTracker;
