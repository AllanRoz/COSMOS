import { Link, useLocation } from 'react-router-dom';
import { BOTTOM_NAV_ITEMS } from '../../constants/navItems';

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-cosmos-slate border-t border-white/10 flex items-stretch"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-label="Mobile navigation"
    >
      {BOTTOM_NAV_ITEMS.map(({ name, path, icon: Icon, shortName }) => {
        const active = location.pathname === path;
        return (
          <Link
            key={path}
            to={path}
            className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors
                        text-[10px] font-medium tracking-wide min-h-[56px]
                        ${active ? 'text-cosmos-accent' : 'text-white/40 hover:text-white'}`}
            aria-current={active ? 'page' : undefined}
            aria-label={name}
          >
            <Icon size={22} />
            <span>{shortName}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
