import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, FileText, BarChart2, LogOut } from 'lucide-react';

const Navbar = () => {
    const { logout } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { path: '/', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/applications', label: 'Applications', icon: FileText },
        { path: '/analytics', label: 'Analytics', icon: BarChart2 },
    ];

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 flex items-center px-10">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 mr-12">
                <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                    <span className="text-white font-black text-base">A</span>
                </div>
                <span className="text-white font-bold text-xl tracking-tight">Ascendra</span>
            </Link>

            {/* Nav Links */}
            <div className="flex items-center gap-4">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${active
                                ? 'bg-cyan-500/10 text-cyan-400'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            <Icon className="w-4 h-4 shadow-sm" />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </div>

            {/* Logout */}
            <div className="ml-auto">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm"
                >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
