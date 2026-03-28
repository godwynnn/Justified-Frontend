'use client';

import { useMedia } from '../context/MediaContext';

export default function SermonFloatingBar() {
    const { activeSermon, isPlaying, isMinimized, setMinimized, togglePlay, stop } = useMedia();

    if (!activeSermon || !isMinimized) return null;

    return (
        <div className="fixed bottom-6 left-6 right-6 z-50 animate-in slide-in-from-bottom-10 duration-300">
            <div className="mx-auto max-w-2xl bg-[#000c1d]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-3 shadow-2xl shadow-black/80 flex items-center justify-between gap-4">
                {/* Info & Thumbnail */}
                <button 
                    onClick={() => setMinimized(false)}
                    className="flex items-center gap-3 min-w-0 flex-1 hover:opacity-80 transition-opacity text-left"
                >
                    <div className="size-12 rounded-lg bg-cover bg-center shrink-0 border border-white/10 overflow-hidden" 
                         style={{ backgroundImage: `url('${activeSermon.image_url || "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2832&auto=format&fit=crop"}')` }}>
                        <div className="inset-0 flex items-center justify-center bg-black/40">
                             <span className="material-symbols-outlined text-white text-xs animate-pulse">equalizer</span>
                        </div>
                    </div>
                    <div className="min-w-0">
                        <h4 className="text-sm font-bold text-white truncate uppercase tracking-tight">{activeSermon.title}</h4>
                        <p className="text-[10px] text-slate-400 truncate uppercase tracking-widest">{activeSermon.speaker}</p>
                    </div>
                </button>

                {/* Controls */}
                <div className="flex items-center gap-2 pr-2">
                    <button
                        onClick={togglePlay}
                        className="flex items-center justify-center size-10 rounded-full bg-[#1313ec] hover:bg-[#1313ec]/80 text-white transition-all shadow-lg shadow-[#1313ec]/20"
                    >
                        <span className="material-symbols-outlined">
                            {isPlaying ? 'pause' : 'play_arrow'}
                        </span>
                    </button>
                    <button
                        onClick={() => setMinimized(false)}
                        className="hidden sm:flex items-center justify-center size-10 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-white/10"
                        title="Expand"
                    >
                        <span className="material-symbols-outlined">open_in_full</span>
                    </button>
                    <button
                        onClick={stop}
                        className="flex items-center justify-center size-10 rounded-full bg-white/5 hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors border border-white/10"
                        title="Close"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
