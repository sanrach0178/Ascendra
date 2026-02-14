import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, FileText, BarChart2, LogOut, Menu, X } from 'lucide-react';
import Logo from '../assets/logo.png';

const Navbar = () => {
    const { logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
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
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#09090b]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
                    <img src={Logo} alt="Ascendra Logo" className="w-14 h-14 sm:w-auto sm:h-[72px] object-contain group-hover:scale-110 transition-transform" />
                    <span className="text-white font-bold text-xl sm:text-2xl tracking-tight">Ascendra</span>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${active
                                    ? 'bg-primary-500/10 text-primary-400 shadow-[inset_0_0_12px_rgba(37,99,235,0.1)]'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </div>

                {/* Desktop Logout */}
                <div className="hidden md:block">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-5 py-2.5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl text-sm font-semibold transition-all duration-300 hover:border-white/20"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden bg-[#09090b] border-b border-white/10 animate-in slide-in-from-top duration-300">
                    <div className="px-4 py-6 space-y-3">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.path);
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-all ${active
                                        ? 'bg-primary-500/10 text-primary-400'
                                        : 'text-gray-400'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                        <div className="pt-4 mt-4 border-t border-white/5">
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsOpen(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 text-red-400 font-semibold"
                            >
                                <LogOut className="w-5 h-5" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
