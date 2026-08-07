import { 
  Rocket, 
  Orbit, 
  Waves, 
  Telescope, 
  Image as ImageIcon, 
  Navigation, 
  Zap,
  Search,
  Sparkles,
  Heart
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import GlobalSearch from './GlobalSearch';
import { useState } from 'react';

const navigation = [
  { name: 'Mission Control', path: '/', icon: <Zap size={20} /> },
  { name: 'Solar System', path: '/solar-system', icon: <Orbit size={20} /> },
  { name: 'Satellites', path: '/satellites', icon: <Navigation size={20} /> },
  { name: 'Space Weather', path: '/space-weather', icon: <Waves size={20} /> },
  { name: 'Astronomy', path: '/sky', icon: <Telescope size={20} /> },
  { name: 'NASA Explorer', path: '/nasa-explorer', icon: <ImageIcon size={20} /> },
  { name: 'Missions', path: '/missions', icon: <Rocket size={20} /> },
  { name: 'My Cosmos', path: '/my-cosmos', icon: <Heart size={20} /> },
  { name: 'AI Observatory', path: '/ai-observatory', icon: <Sparkles size={20} /> },
];

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <aside 
      className={`
        fixed inset-0 z-50 bg-cosmos-slate flex flex-col transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 md:inset-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        w-full md:w-64 border-r border-white/10
      `}
    >
      <div className="p-6">
        <h1 className="text-2xl font-bold tracking-tighter text-cosmos-accent">COSMOS</h1>
        <p className="text-xs text-white/40">Explore the universe</p>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        {navigation.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => onClose()}
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
              location.pathname === item.path 
              ? 'bg-cosmos-accent text-cosmos-black' 
              : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
            aria-current={location.pathname === item.path ? 'page' : undefined}
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button 
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-2 w-full text-white/40 hover:text-white transition-colors"
          aria-label="Open global search"
          aria-expanded={isSearchOpen}
        >
          <Search size={14} />
          <span className="text-xs">Global Search</span>
        </button>
      </div>
      
      <GlobalSearch isOpen={isSearchOpen} onClose={() => {
        setIsSearchOpen(false);
        onClose();
      }} />
    </aside>
  );
};

export default Sidebar;
