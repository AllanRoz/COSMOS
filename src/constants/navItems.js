// Shared navigation items used by Sidebar and BottomNav
import { 
  Zap, Orbit, Navigation, Waves, Telescope, 
  Image as ImageIcon, Rocket, Heart, Sparkles 
} from 'lucide-react';

export const NAV_ITEMS = [
  { name: 'Mission Control', path: '/', icon: Zap, shortName: 'Control' },
  { name: 'Solar System',    path: '/solar-system', icon: Orbit, shortName: 'Solar' },
  { name: 'Satellites',      path: '/satellites', icon: Navigation, shortName: 'Sats' },
  { name: 'Space Weather',   path: '/space-weather', icon: Waves, shortName: 'Weather' },
  { name: 'Astronomy',       path: '/sky', icon: Telescope, shortName: 'Sky' },
  { name: 'NASA Explorer',   path: '/nasa-explorer', icon: ImageIcon, shortName: 'NASA' },
  { name: 'Missions',        path: '/missions', icon: Rocket, shortName: 'Missions' },
  { name: 'My Cosmos',       path: '/my-cosmos', icon: Heart, shortName: 'Mine' },
  { name: 'AI Observatory',  path: '/ai-observatory', icon: Sparkles, shortName: 'AI' },
];

// Bottom nav shows the 5 most-used items
export const BOTTOM_NAV_ITEMS = [
  { name: 'Mission Control', path: '/', icon: Zap, shortName: 'Control' },
  { name: 'Solar System',    path: '/solar-system', icon: Orbit, shortName: 'Solar' },
  { name: 'Satellites',      path: '/satellites', icon: Navigation, shortName: 'Sats' },
  { name: 'Weather',         path: '/space-weather', icon: Waves, shortName: 'Weather' },
  { name: 'AI Observatory',  path: '/ai-observatory', icon: Sparkles, shortName: 'AI' },
];
