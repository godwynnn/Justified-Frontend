import Navbar from '../components/Navbar';

export default function LiveStream() {
    return (
        <div className="bg-[#000814] text-white min-h-screen relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] size-[40vw] rounded-full bg-[#1313ec]/5 blur-[120px]"></div>
                <div className="absolute bottom-[20%] -right-[5%] size-[30vw] rounded-full bg-[#1313ec]/10 blur-[100px]"></div>
            </div>

            <Navbar />

            {/* Experimental Header */}
            <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 flex flex-col items-center text-center">
                <div className="relative inline-block">
                    <h1 className="hero-text-large font-light tracking-tighter text-white/10 select-none italic xl:text-[10rem] md:text-[8rem] text-[5rem] -ml-4 md:-ml-8 opacity-40">
                        WATCH
                    </h1>
                    <div className="relative -mt-12 md:-mt-20 ml-12 md:ml-24">
                        <h1 className="hero-text-large font-bold tracking-tighter text-white xl:text-[10rem] md:text-[8rem] text-[5rem]">
                            LIVE
                        </h1>
                    </div>
                </div>
                
                <p className="mt-12 text-xl text-slate-400 font-light max-w-2xl leading-relaxed">
                    Worship with us from anywhere in the world. Experience the presence of God right where you are.
                </p>
            </div>

            {/* Video Player Area */}
            <div className="max-w-7xl mx-auto px-6 mb-24">
                <div className="aspect-video bg-[#000c1d] border border-white/10 rounded-xl flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519682577862-22b62b24e4dcb?q=80&w=2940&auto=format&fit=crop')] bg-cover opacity-20 group-hover:opacity-40 transition-opacity duration-1000 blur-sm"></div>
                    <div className="relative z-10 text-center">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 top-4 right-4 absolute animate-pulse rounded-full text-white text-xs font-bold uppercase tracking-widest">
                            <span className="w-2 h-2 bg-white rounded-full"></span>
                            Live Now
                        </span>
                        <div className="w-24 h-24 bg-[#1313ec] rounded-full flex items-center justify-center mx-auto mb-6 cursor-pointer hover:scale-110 transition-transform hover:bg-white text-white hover:text-[#1313ec]">
                            <span className="text-4xl ml-2 material-symbols-outlined">play_arrow</span>
                        </div>
                        <p className="text-2xl font-bold tracking-tight text-white">Sunday Worship Service</p>
                        <p className="text-white/40 mt-2 font-mono text-sm">Waiting for broadcast to begin...</p>
                    </div>
                </div>
            </div>

            {/* Upcoming Services */}
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold tracking-tight mb-10 pb-4 border-b border-white/10">Upcoming Live Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { day: "Sunday", service: "Worship Service", time: "10:00 AM" },
                        { day: "Wednesday", service: "Bible Study", time: "6:30 PM" },
                        { day: "Friday", service: "Prayer Meeting", time: "7:00 PM" },
                    ].map((item, idx) => (
                        <div key={idx} className="bg-[#000c1d] rounded-xl border border-white/5 p-8 hover:border-[#1313ec]/50 transition-colors">
                            <p className="text-[#1313ec] tracking-widest text-xs font-bold mb-4 uppercase">{item.day}</p>
                            <h3 className="text-2xl font-bold text-white mb-2">{item.service}</h3>
                            <p className="text-white/60 font-mono">{item.time}</p>
                            <button className="mt-6 border border-white/20 hover:bg-white/5 px-6 py-2 rounded-lg text-sm font-bold transition-all w-full">Set Reminder</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
