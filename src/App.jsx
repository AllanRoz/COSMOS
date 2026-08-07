import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import MissionControl from './pages/MissionControl';
import SolarSystem from './pages/SolarSystem';
import NASAExplorer from './pages/NASAExplorer';
import SatelliteTracker from './pages/SatelliteTracker';
import SpaceWeatherCenter from './pages/SpaceWeatherCenter';
import Sky from './pages/Sky';
import MissionDetail from './pages/MissionDetail';
import AiObservatory from './pages/AiObservatory';
import MyCosmos from './pages/MyCosmos';
import { FavoritesProvider } from './context/FavoritesContext';

function App() {
  return (
    <FavoritesProvider>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<MissionControl />} />
          <Route path="solar-system" element={<SolarSystem />} />
          <Route path="nasa-explorer" element={<NASAExplorer />} />
          <Route path="satellites" element={<SatelliteTracker />} />
          <Route path="space-weather" element={<SpaceWeatherCenter />} />
          <Route path="sky" element={<Sky />} />
          <Route path="my-cosmos" element={<MyCosmos />} />
          <Route path="missions" element={<MissionDetail />} />
          <Route path="missions/:id" element={<MissionDetail />} />
          <Route path="ai-observatory" element={<AiObservatory />} />
        </Route>
      </Routes>
    </FavoritesProvider>
  );
}

export default App;
