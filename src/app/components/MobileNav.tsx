'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const links = [
    { href: '/about', label: 'Our Story' },
    { href: '/sermons', label: 'Messages' },
    { href: '/live', label: 'Live Stream' },
];

export default function MobileNav() {
    const [open, setOpen] = useState(false);
    const { isAuthenticated, logout } = useAuth();

    return (
        <div className="md:hidden">
            {/* Hamburger / Close button */}
            <button
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                onClick={() => setOpen(o => !o)}
                className="flex items-center justify-center rounded-lg p-1.5 hover:bg-white/10 transition-colors"
            >
                <span className="material-symbols-outlined text-white text-2xl">
                    {open ? 'close' : 'menu'}
                </span>
            </button>

            {/* Dropdown drawer */}
            {open && (
                <div className="absolute top-full left-0 w-full bg-[#000814]/95 backdrop-blur-md border-b border-white/10 px-6 py-8 flex flex-col gap-6 z-50">
                    {links.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setOpen(false)}
                            className="text-lg font-medium hover:text-[#1313ec] transition-colors border-b border-white/5 pb-2"
                        >
                            {label}
                        </Link>
                    ))}
                    
                    {isAuthenticated ? (
                        <>
                            <Link
                                href="/sermons/new"
                                onClick={() => setOpen(false)}
                                className="text-lg font-bold text-[#1313ec] border-b border-white/5 pb-2 flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-base">add</span>
                                New Sermon
                            </Link>
                            <button
                                onClick={() => {
                                    logout();
                                    setOpen(false);
                                }}
                                className="text-left text-lg font-medium text-red-500"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                onClick={() => setOpen(false)}
                                className="text-lg font-medium text-slate-400"
                            >
                                Log In
                            </Link>
                            <Link
                                href="/signup"
                                onClick={() => setOpen(false)}
                                className="bg-[#1313ec] hover:bg-[#1313ec]/90 text-white px-6 py-4 rounded-lg text-base font-bold transition-all text-center mt-2 shadow-lg shadow-[#1313ec]/20"
                            >
                                Join Us
                            </Link>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
