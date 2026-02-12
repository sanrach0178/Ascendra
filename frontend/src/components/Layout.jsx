import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Sidebar';

const Layout = () => {
    return (
        <div className="min-h-screen bg-dark-950 text-gray-100 font-sans selection:bg-cyan-500 selection:text-white">
            <Navbar />
            <main className="pt-14">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
