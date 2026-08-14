import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar';
import BottomNav from '../components/navigation/BottomNav';
import { Menu } from 'lucide-react';
import { NAV_ITEMS } from '../constants/navItems';

// Map path to page name for the mobile header
const getPageName = (pathname) => {
  // Handle dynamic routes like /missions/:id
  if (pathname.startsWith('/missions/')) return 'Mission Detail';
  const match = NAV_ITEMS.find(i => i.path === pathname);
  return match ? match.name : 'COSMOS';
};

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const pageName = getPageName(location.pathname);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex h-screen bg-cosmos-black text-cosmos-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Mobile backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Main content */}
      <main className="flex-1 relative flex flex-col overflow-hidden min-w-0">
        {/* Mobile header */}
        <header className="md:hidden flex items-center justify-between px-4 h-14 shrink-0
                           bg-cosmos-slate border-b border-white/10">
          <button
            onClick={openSidebar}
            className="p-2 -ml-2 rounded-md bg-white/5 hover:bg-white/10 transition-colors
                       min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Open navigation menu"
            aria-expanded={isSidebarOpen}
          >
            <Menu size={22} />
          </button>
          <h1 className="text-base font-bold tracking-tight text-cosmos-accent absolute left-1/2 -translate-x-1/2">
            {pageName}
          </h1>
          {/* Right slot kept for future icons */}
          <div className="w-10" />
        </header>

        {/* Page content — add bottom padding on mobile to clear the bottom nav */}
        <div className="flex-1 overflow-y-auto relative pb-0 md:pb-0">
          <div className="md:pb-0 pb-16">
            <Outlet />
          </div>
        </div>
      </main>

      {/* Bottom navigation — mobile only */}
      <BottomNav />
    </div>
  );
};

export default DashboardLayout;
