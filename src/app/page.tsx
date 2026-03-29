import Link from 'next/link';

async function getLatestSermon() {
    try {
        const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api';
        const res = await fetch(`${API_BASE}/sermons/`, { cache: 'no-store' });
        if (!res.ok) return null;
        const sermons = await res.json();
        return sermons.length > 0 ? sermons[0] : null;
    } catch (error) {
        console.error("Failed to fetch sermons:", error);
        return null;
    }
}

import Navbar from './components/Navbar';
import ServiceHours from './components/ServiceHours';
import LatestSermon from './components/LatestSermon';

export default async function Home() {
    const latestSermon = await getLatestSermon();

    return (
        <div className="bg-[#000814] text-white min-h-screen relative overflow-hidden">
            <Navbar />

            {/* Hero Section: Experimental Typography */}
            <main className="relative flex flex-1 items-center justify-center pt-20">
                {/* Background Decorative Elements (Subtle) */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-[10%] -left-[10%] size-[40vw] rounded-full bg-[#1313ec]/5 blur-[120px]"></div>
                    <div className="absolute top-[40%] -right-[5%] size-[30vw] rounded-full bg-[#1313ec]/10 blur-[100px]"></div>
                </div>

                <div className="container mx-auto px-6 lg:px-20 relative min-h-[80vh] flex flex-col justify-center mt-12 md:mt-24 py-12 md:py-24">
                    {/* The Typography Layering System */}
                    <div className="relative w-full">
                        {/* SVG Path Interweaving (Variant 2 Curly Logic) */}
                        <svg className="curly-svg layer-svg opacity-80" fill="none" preserveAspectRatio="none" viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg">
                            <path d="M-50,350 C150,450 350,50 500,250 C650,450 850,50 1050,150" stroke="#1313ec" strokeDasharray="1 20" strokeLinecap="round" strokeWidth="12"></path>
                            <path d="M-50,350 C150,450 350,50 500,250 C650,450 850,50 1050,150" stroke="#1313ec" strokeLinecap="round" strokeWidth="4"></path>
                        </svg>

                        {/* Text Layer 1: Behind */}
                        <div className="layer-behind relative z-10 text-center md:text-left">
                            <h1 className="hero-text-large font-light tracking-tighter text-white/20 select-none italic xl:text-[12rem] md:text-[8rem] text-[5rem] ml-0 md:-ml-8">
                                FAITH
                            </h1>
                        </div>

                        {/* Text Layer 2: Middle (Partial Overlap) */}
                        <div className="layer-front relative mt-0 md:-mt-8 ml-0 md:ml-16 z-30 text-center md:text-left">
                            <h1 className="hero-text-large font-bold tracking-tighter text-white xl:text-[12rem] md:text-[8rem] text-[5rem]">
                                AWAKENING
                            </h1>
                        </div>

                        {/* Text Layer 3: Accent Floating */}
                        <div className="layer-front relative mt-12 md:mt-8 flex justify-center md:justify-end pr-0 md:pr-20 z-40">
                            <h2 className="text-3xl md:text-5xl font-light text-[#1313ec] italic max-w-lg text-center md:text-right leading-tight">
                                Revealing Christ Globally.
                            </h2>
                        </div>
                    </div>

                    {/* Asymmetrical Content Info */}
                    <div className="mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
                        <div className="md:col-span-5 layer-front">
                            <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed">
                                A ministry is committed to revealing Jesus to all people through the sound teaching of God’s Word and the demonstration of His miraculous power.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link href="/live" className="bg-[#1313ec] hover:scale-105 transition-transform text-white h-14 px-8 rounded-lg font-bold flex items-center gap-3">
                                    Experience Service
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </Link>
                                <Link href="/about" className="border border-white/20 hover:bg-white/5 transition-colors text-white h-14 px-8 rounded-lg font-bold flex items-center">
                                    Our Journey
                                </Link>
                            </div>
                        </div>

                        <div className="hidden md:block md:col-start-9 md:col-span-4 text-right">
                            <div className="flex flex-col items-end gap-2 text-slate-500 text-sm">
                                <span className="flex items-center gap-2 uppercase tracking-widest">Next Gathering <span className="size-2 bg-[#1313ec] rounded-full animate-pulse"></span></span>
                                <span className="text-white font-bold text-lg">Sunday • 10:00 AM</span>
                                <span>Downtown Arts District, Studio 44</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
                    <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-white"></div>
                    <span className="text-[10px] uppercase tracking-[0.3em]">Explore</span>
                </div>
            </main>

            {/* Dynamic Data Section: Latest Sermon preview from client component */}
            {latestSermon && <LatestSermon sermon={latestSermon} />}

            <ServiceHours />

            {/* Feature Section */}
            <section className="bg-[#000814] py-24 relative z-40">
                <div className="mx-auto max-w-[1440px] px-6 lg:px-20">
                    <div className="mb-20">
                        <h3 className="text-sm font-bold uppercase tracking-[0.4em] text-[#1313ec] mb-4">Values</h3>
                        <h2 className="text-4xl md:text-6xl font-bold max-w-2xl">Manifesting Christ Everywhere</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="group border border-white/10 bg-[#000c1d] p-10 rounded-xl hover:border-[#1313ec]/50 transition-all duration-500">
                            <div className="mb-8 text-[#1313ec] group-hover:scale-110 transition-transform origin-left">
                                <span className="material-symbols-outlined text-4xl">auto_awesome</span>
                            </div>
                            <h4 className="text-xl font-bold mb-4">Digital Sanctuary</h4>
                            <p className="text-slate-400 leading-relaxed font-light">
                                Crafting intentional moments of reflection and connection within the noise of the digital age.
                            </p>
                        </div>

                        <div className="group border border-white/10 bg-[#000c1d] p-10 rounded-xl hover:border-[#1313ec]/50 transition-all duration-500">
                            <div className="mb-8 text-[#1313ec] group-hover:scale-110 transition-transform origin-left">
                                <span className="material-symbols-outlined text-4xl">palette</span>
                            </div>
                            <h4 className="text-xl font-bold mb-4">Creative Worship</h4>
                            <p className="text-slate-400 leading-relaxed font-light">
                                Faith expressed through architecture, sound, and visual experimentation. Beauty as a gateway to the divine.
                            </p>
                        </div>

                        <div className="group border border-white/10 bg-[#000c1d] p-10 rounded-xl hover:border-[#1313ec]/50 transition-all duration-500">
                            <div className="mb-8 text-[#1313ec] group-hover:scale-110 transition-transform origin-left">
                                <span className="material-symbols-outlined text-4xl">groups</span>
                            </div>
                            <h4 className="text-xl font-bold mb-4">Community Hub</h4>
                            <p className="text-slate-400 leading-relaxed font-light">
                                Authentic relationships built on shared curiosity and a desire for meaningful impact in our city.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Newsletter Section */}
            <section className="py-24 bg-[#1313ec]">
                <div className="mx-auto max-w-[1440px] px-6 lg:px-20">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="md:max-w-xl">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Join the Movement.</h2>
                            <p className="text-white/80 text-lg font-light">
                                Stay connected with our weekly artistic inspirations and community updates. No noise, just grace.
                            </p>
                        </div>
                        <div className="w-full md:max-w-md">
                            <form className="flex flex-col sm:flex-row gap-3">
                                <input className="flex-1 rounded-lg border-none bg-white/10 text-white placeholder:text-white/50 focus:ring-2 focus:ring-white px-6 py-4 outline-none" placeholder="Your email address" type="email" />
                                <button type="button" className="bg-white text-[#1313ec] px-8 py-4 rounded-lg font-bold hover:bg-slate-100 transition-colors">
                                    Subscribe
                                </button>
                            </form>
                            <p className="mt-4 text-xs text-white/60">Respecting your privacy always.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#000814] py-20 border-t border-white/5">
                <div className="mx-auto max-w-[1440px] px-6 lg:px-20">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-1 md:col-span-2">
                            <div className="mb-8 flex justify-start">
                                <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
                                    <img
                                        src="/logo.png"
                                        alt="Justified Global Ministries"
                                        className="h-20 w-auto object-contain"
                                    />
                                </Link>
                            </div>
                            <p className="text-slate-400 max-w-sm font-light">
                                A contemporary spiritual community redefining the intersection of faith, art, and modern life.
                            </p>
                        </div>
                        <div>
                            <h5 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">Connect</h5>
                            <ul className="space-y-4 text-slate-400 font-light">
                                <li><Link className="hover:text-[#1313ec] transition-colors" href="https://www.instagram.com/justifiedglobal/">Instagram</Link></li>
                                <li><Link className="hover:text-[#1313ec] transition-colors" href="/contact">YouTube</Link></li>
                                <li><Link className="hover:text-[#1313ec] transition-colors" href="https://web.facebook.com/JustifiedGlobalOutreach/?_rdc=1&_rdr#">Facebook</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">Resource</h5>
                            <ul className="space-y-4 text-slate-400 font-light">
                                <li><Link className="hover:text-[#1313ec] transition-colors" href="/privacy">Privacy</Link></li>
                                <li><Link className="hover:text-[#1313ec] transition-colors" href="/donate">Giving</Link></li>
                                <li><Link className="hover:text-[#1313ec] transition-colors" href="/contact">Contact</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/5 text-slate-500 text-sm">
                        <p>© {new Date().getFullYear()} Justified Global Ministries. All rights reserved.</p>
                        <p className="mt-4 md:mt-0 italic font-light">Faith reimagined for the modern age.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
