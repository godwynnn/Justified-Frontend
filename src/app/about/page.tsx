import Navbar from '../components/Navbar';

export default function About() {
    return (
        <div className="bg-[#000814] text-white min-h-screen relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] size-[40vw] rounded-full bg-[#1313ec]/5 blur-[120px]"></div>
                <div className="absolute top-[40%] -right-[5%] size-[30vw] rounded-full bg-[#1313ec]/10 blur-[100px]"></div>
            </div>

            <Navbar />

            {/* Experimental Header */}
            <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
                <div className="relative inline-block">
                    <h1 className="hero-text-large font-light tracking-tighter text-white/10 select-none italic xl:text-[10rem] md:text-[8rem] text-[5rem] -ml-4 md:-ml-8 opacity-40">
                        WHO WE
                    </h1>
                    <div className="relative -mt-12 md:-mt-20 ml-12 md:ml-24">
                        <h1 className="hero-text-large font-bold tracking-tighter text-white xl:text-[10rem] md:text-[8rem] text-[5rem]">
                            ARE
                        </h1>
                    </div>
                </div>
                
                <p className="mt-12 text-xl md:text-2xl text-slate-400 font-light max-w-2xl leading-relaxed">
                    Justified Global Ministries is a Christ-centered apostolic teaching and training ministry with a divine mandate to preach the Gospel of Jesus Christ to all nations.
                </p>
            </div>

            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
                <div className="bg-[#000c1d] rounded-xl p-12 border border-white/10 relative overflow-hidden group hover:border-[#1313ec]/50 transition-colors">
                    <h2 className="text-3xl font-bold tracking-tight mb-4 text-white">Our Vision</h2>
                    <p className="text-white/70 leading-relaxed font-light">
                        At its core, Justified Global Ministries is focused on raising and equipping ministers of the Gospel through doctrinal discipleship and structured mentoring programs under its Training Hub, with a strong emphasis on campuses and youth-centered communities.
                        In addition, the ministry establishes and oversees local church expressions led by appointed pastors, creating platforms where believers can actively serve and contribute to the growth of the Body of Christ within their local assemblies.
                    </p>
                </div>
                <div className="bg-[#000c1d] rounded-xl p-12 border border-white/10 relative overflow-hidden group hover:border-[#1313ec]/50 transition-colors">
                    <h2 className="text-3xl font-bold tracking-tight mb-4 text-white">Core Values</h2>
                    <ul className="text-white/70 leading-relaxed font-mono space-y-2">
                        <li className="flex items-center gap-4"><span className="material-symbols-outlined text-[#1313ec]">check_circle</span> Faith</li>
                        <li className="flex items-center gap-4"><span className="material-symbols-outlined text-[#1313ec]">check_circle</span> Love</li>
                        <li className="flex items-center gap-4"><span className="material-symbols-outlined text-[#1313ec]">check_circle</span> Worship</li>
                        <li className="flex items-center gap-4"><span className="material-symbols-outlined text-[#1313ec]">check_circle</span> Community</li>
                        <li className="flex items-center gap-4"><span className="material-symbols-outlined text-[#1313ec]">check_circle</span> Service</li>
                    </ul>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 border-t border-white/10 pt-24 text-center">
                <h2 className="text-4xl font-bold tracking-tight mb-12 text-white">Our Leadership</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                    <div className="group">
                        <div className="w-48 h-48 mx-auto bg-zinc-800 rounded-full mb-6 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 ring-2 ring-transparent group-hover:ring-[#1313ec]">
                            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2787&auto=format&fit=crop" className="w-full h-full object-cover" alt="Pastor John Doe" />
                        </div>
                        <h3 className="text-2xl font-bold tracking-tight text-white mb-2">Pastor John Doe</h3>
                        <p className="text-[#1313ec] uppercase tracking-widest text-xs font-bold mb-4">Senior Pastor</p>
                        <p className="text-white/50 font-light text-sm italic">"Called to preach the uncompromised truth with love and clarity."</p>
                    </div>
                    <div className="group">
                        <div className="w-48 h-48 mx-auto bg-zinc-800 rounded-full mb-6 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 ring-2 ring-transparent group-hover:ring-[#1313ec]">
                            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2788&auto=format&fit=crop" className="w-full h-full object-cover" alt="Pastor Jane Smith" />
                        </div>
                        <h3 className="text-2xl font-bold tracking-tight text-white mb-2">Pastor Jane Smith</h3>
                        <p className="text-[#1313ec] uppercase tracking-widest text-xs font-bold mb-4">Associate Pastor</p>
                        <p className="text-white/50 font-light text-sm italic">"Dedicated to building strong families and empowering the next generation."</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
