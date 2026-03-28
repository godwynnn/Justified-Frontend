'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import MobileNav from './MobileNav';

interface NavbarProps {
    showSearch?: boolean;
    onSearchChange?: (val: string) => void;
}

export default function Navbar({ showSearch, onSearchChange }: NavbarProps) {
    const { isAuthenticated, user, logout } = useAuth();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#000814]/80 backdrop-blur-md px-6 lg:px-20 py-5">
            <nav className="mx-auto flex max-w-[1440px] items-center justify-between">
                <div className="flex items-center gap-12">
                    {/* Logo */}
                    <Link href="/" className="flex items-center group">
                        <img 
                            src="/logo.png" 
                            alt="Justified Logo" 
                            className="h-12 md:h-14 w-auto object-contain group-hover:scale-105 transition-transform" 
                        />
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-10">
                        <Link className="text-sm font-medium text-slate-400 hover:text-white transition-colors" href="/about">Our Story</Link>
                        <Link className="text-sm font-medium text-slate-400 hover:text-white transition-colors" href="/sermons">Messages</Link>
                        <Link className="text-sm font-medium text-slate-400 hover:text-white transition-colors" href="/live">Live Stream</Link>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    {/* Optional Search */}
                    {showSearch && (
                        <div className="relative group hidden lg:block">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#1313ec] transition-colors">search</span>
                            <input 
                                className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-[#1313ec] focus:border-[#1313ec] w-64 transition-all outline-none" 
                                placeholder="Search sermons..." 
                                type="text" 
                                onChange={(e) => onSearchChange?.(e.target.value)}
                            />
                        </div>
                    )}

                    {/* Desktop Auth */}
                    <div className="hidden md:flex items-center gap-4">
                        {isAuthenticated ? (
                            <div className="flex items-center gap-4 border-l border-white/10 pl-6">
                                <Link href="/sermons/new" className="flex items-center gap-2 border border-white/10 hover:bg-white/5 px-4 py-2 rounded-lg text-xs font-bold transition-all">
                                    <span className="material-symbols-outlined text-base">add</span>
                                    New Sermon
                                </Link>
                                <div className="flex items-center gap-3">
                                    <div className="size-8 bg-white/10 rounded-full flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white/60 text-lg">person</span>
                                    </div>
                                    <div className="hidden sm:block">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#1313ec] leading-none">Admin</p>
                                        <p className="text-xs font-bold text-white leading-none mt-1">{user?.first_name}</p>
                                    </div>
                                    <button 
                                        onClick={logout}
                                        className="ml-2 text-slate-500 hover:text-white transition-colors"
                                        title="Logout"
                                    >
                                        <span className="material-symbols-outlined text-lg">logout</span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-6">
                                <Link href="/login" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Log In</Link>
                                <Link href="/signup" className="bg-[#1313ec] hover:bg-[#1313ec]/80 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg shadow-[#1313ec]/20">
                                    Join Us
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Nav Toggle */}
                    <MobileNav />
                </div>
            </nav>
        </header>
    );
}
