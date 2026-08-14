import { Search, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import GlobalSearch from './GlobalSearch';
import { useState } from 'react';
import { NAV_ITEMS } from '../../constants/navItems';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <aside
      className={`
        fixed top-0 left-0 bottom-0 z-50 bg-cosmos-slate flex flex-col
        transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 md:flex
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        w-72 md:w-64 shrink-0 border-r border-white/10
      `}
    >
      {/* Logo row */}
      <div className="flex items-center justify-between p-5 md:p-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tighter text-cosmos-accent">COSMOS</h1>
          <p className="text-xs text-white/40">Explore the universe</p>
        </div>
        {/* Close button – mobile only */}
        <button
          onClick={onClose}
          className="md:hidden p-2 rounded-md bg-white/5 hover:bg-white/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Close navigation"
        >
          <X size={20} />
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors min-h-[44px] ${
                active
                  ? 'bg-cosmos-accent text-cosmos-black font-semibold'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
              aria-current={active ? 'page' : undefined}
            >
              <Icon size={20} className="shrink-0" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Search */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-3 w-full text-white/40 hover:text-white transition-colors
                     py-3 px-3 rounded-lg hover:bg-white/5 min-h-[44px]"
          aria-label="Open global search"
          aria-expanded={isSearchOpen}
        >
          <Search size={16} className="shrink-0" />
          <span className="text-sm">Global Search</span>
        </button>
      </div>

      <GlobalSearch
        isOpen={isSearchOpen}
        onClose={() => {
          setIsSearchOpen(false);
          onClose();
        }}
      />
    </aside>
  );
};

export default Sidebar;
