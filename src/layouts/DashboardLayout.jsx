import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-cosmos-black text-cosmos-white overflow-hidden">
      <Sidebar />
      <main className="flex-1 relative overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;