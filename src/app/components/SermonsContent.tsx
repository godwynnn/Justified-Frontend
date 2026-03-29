'use client';

import Link from 'next/link';
import SermonGrid from './SermonGrid';
import Navbar from './Navbar';
import { useAuth } from '../context/AuthContext';

export default function SermonsContent({ sermons, latestSermon }: { sermons: any[], latestSermon: any }) {
    const { isAuthenticated } = useAuth();
    return (
        <div className="bg-[#000814] text-white min-h-screen relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] size-[40vw] rounded-full bg-[#1313ec]/10 blur-[120px]"></div>
                <div className="absolute top-[30%] -right-[5%] size-[30vw] rounded-full bg-[#1313ec]/10 blur-[100px]"></div>
            </div>

            <Navbar showSearch />
            
            {/* Mobile Floating Action Button for Admins */}
            {isAuthenticated && (
                <div className="md:hidden fixed bottom-10 right-6 z-[60]">
                    <Link 
                        href="/sermons/new" 
                        className="size-16 bg-[#1313ec] rounded-full flex items-center justify-center shadow-2xl shadow-[#1313ec]/40 ring-4 ring-white/10 active:scale-95 transition-all text-white border border-white/20"
                    >
                        <span className="material-symbols-outlined text-3xl">add</span>
                    </Link>
                </div>
            )}

            <main className="max-w-[1400px] mx-auto pb-20 px-6 lg:px-20">
                <SermonGrid sermons={sermons} featuredSermon={latestSermon} />

                {/* Pagination Placeholder */}
                <div className="mt-16 flex items-center justify-center gap-4">
                    <button className="bg-white/5 border border-white/10 p-2 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-30" disabled>
                        <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <div className="flex items-center gap-2">
                        <button className="bg-[#1313ec] size-10 rounded-lg font-bold text-sm">1</button>
                    </div>
                    <button className="bg-white/5 border border-white/10 p-2 rounded-lg hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-black/40 border-t border-white/10 py-16 px-6 lg:px-20 mt-20">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        <div className="space-y-6">
                            <Link href="/" className="flex items-center gap-3 group">
                                <img
                                    src="/logo.png"
                                    alt="Justified Logo"
                                    className="h-10 w-auto object-contain group-hover:scale-105 transition-transform"
                                />
                            </Link>
                            <p className="text-white/40 text-sm leading-relaxed">
                                Join us for our weekly gatherings at our various campuses across the city.
                            </p>
                            <div className="flex gap-4">
                                <Link className="text-white/40 hover:text-[#1313ec] transition-colors" href="#"><span className="material-symbols-outlined">social_leaderboard</span></Link>
                                <Link className="text-white/40 hover:text-[#1313ec] transition-colors" href="#"><span className="material-symbols-outlined">camera</span></Link>
                                <Link className="text-white/40 hover:text-[#1313ec] transition-colors" href="#"><span className="material-symbols-outlined">play_circle</span></Link>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6">Ministries</h4>
                            <ul className="space-y-4 text-sm text-white/40">
                                <li><Link className="hover:text-white transition-colors" href="#">Kids & Youth</Link></li>
                                <li><Link className="hover:text-white transition-colors" href="#">Small Groups</Link></li>
                                <li><Link className="hover:text-white transition-colors" href="#">Global Outreach</Link></li>
                                <li><Link className="hover:text-white transition-colors" href="#">Care & Prayer</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6">Quick Links</h4>
                            <ul className="space-y-4 text-sm text-white/40">
                                <li><Link className="hover:text-white transition-colors" href="/live">Watch Live</Link></li>
                                <li><Link className="hover:text-white transition-colors" href="/donate">Give Online</Link></li>
                                <li><Link className="hover:text-white transition-colors" href="/about">Locations</Link></li>
                                <li><Link className="hover:text-white transition-colors" href="/contact">Contact Us</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6">Newsletter</h4>
                            <p className="text-sm text-white/40 mb-4">Stay updated with our latest news.</p>
                            <div className="flex gap-2">
                                <input className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm w-full focus:ring-[#1313ec] focus:border-[#1313ec]" placeholder="Email" type="email" />
                                <button className="bg-[#1313ec] p-2 rounded-lg">
                                    <span className="material-symbols-outlined">send</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
                        <p>© {new Date().getFullYear()} Justified Global. All rights reserved.</p>
                        <div className="flex gap-8">
                            <Link className="hover:text-white transition-colors" href="/donate">Privacy Policy</Link>
                            <Link className="hover:text-white transition-colors" href="/donate">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
