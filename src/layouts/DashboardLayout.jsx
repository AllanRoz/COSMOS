import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar';
import { Menu, X } from 'lucide-react';

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-cosmos-black text-cosmos-white overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden" 
          onClick={toggleSidebar}
        />
      )}
      
      <main className="flex-1 relative flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-cosmos-slate border-b border-white/10">
          <h1 className="text-xl font-bold tracking-tighter text-cosmos-accent">COSMOS</h1>
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-md bg-white/5 hover:bg-white/10 transition-colors"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        <div className="flex-1 overflow-y-auto relative">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;