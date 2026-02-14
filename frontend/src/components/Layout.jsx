import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Sidebar';

const Layout = () => {
    return (
        <div className="min-h-screen bg-dark-950 text-gray-100 font-sans selection:bg-cyan-500 selection:text-white">
            <Navbar />
            <main className="pt-16 sm:pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
