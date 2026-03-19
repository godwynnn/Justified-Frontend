'use client';

import { useEffect } from 'react';
import { useMedia } from '../context/MediaContext';

function getYouTubeId(url: string): string | null {
    try {
        const u = new URL(url);
        if (u.hostname.includes('youtube.com')) return u.searchParams.get('v');
        if (u.hostname === 'youtu.be') return u.pathname.slice(1);
    } catch { /* not a valid URL */ }
    return null;
}

export default function SermonPlayer() {
    const { activeSermon, isPlaying, togglePlay, setIsPlaying, isMinimized, setMinimized, stop } = useMedia();

    // Close on Escape key
    useEffect(() => {
        if (!activeSermon || isMinimized) return;
        const handler = (e: KeyboardEvent) => e.key === 'Escape' && setMinimized(true);
        document.addEventListener('keydown', handler);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handler);
            document.body.style.overflow = '';
        };
    }, [activeSermon, isMinimized, setMinimized]);

    if (!activeSermon) return null;

    const ytId = activeSermon.video_url ? getYouTubeId(activeSermon.video_url) : null;
    const hasVideo = !!activeSermon.video_url && activeSermon.video_url.trim() !== '';
    const hasAudio = !!activeSermon.audio_url && activeSermon.audio_url.trim() !== '';
    const hasNoMedia = !hasVideo && !hasAudio;

    return (
        /* Backdrop - hidden if minimized */
        <div
            role="dialog"
            aria-modal="true"
            aria-label={`Playing: ${activeSermon.title}`}
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 ${isMinimized ? 'hidden' : ''}`}
            onClick={e => { if (e.target === e.currentTarget) setMinimized(true); }}
        >
            {/* Modal panel */}
            <div className="relative w-full max-w-3xl bg-[#000c1d] border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 p-5 border-b border-white/10">
                    <div className="min-w-0">
                        <p className="text-xs text-[#1313ec] font-bold uppercase tracking-widest mb-1">
                            {new Date(activeSermon.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                        <h2 className="text-lg md:text-xl font-bold text-white truncate">{activeSermon.title}</h2>
                        <p className="text-sm text-slate-400 mt-0.5">{activeSermon.speaker}{activeSermon.scripture && ` · ${activeSermon.scripture}`}</p>
                    </div>
                    <div className="flex items-center gap-2">
                         <button
                            onClick={() => setMinimized(true)}
                            aria-label="Minimize player"
                            className="flex items-center justify-center size-9 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                        >
                            <span className="material-symbols-outlined">expand_more</span>
                        </button>
                        <button
                            onClick={stop}
                            aria-label="Close player"
                            className="flex items-center justify-center size-9 rounded-lg text-slate-400 hover:text-white hover:bg-red-500/20 transition-colors"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                </div>

                {/* Media area */}
                <div className="p-5 space-y-4">
                    {/* Video */}
                    {hasVideo && (
                        <div>
                            {ytId ? (
                                /* YouTube embed */
                                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`}
                                        title={activeSermon.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="absolute inset-0 w-full h-full"
                                    />
                                </div>
                            ) : (
                                /* Direct video file */
                                <div className="rounded-xl overflow-hidden bg-black relative group/vid">
                                    <video
                                        ref={(el) => {
                                            if (el) {
                                                if (isPlaying && !isMinimized) {
                                                    el.play().catch(() => {});
                                                } else if (!isPlaying || (isMinimized && hasAudio)) {
                                                    el.pause();
                                                }
                                            }
                                        }}
                                        src={activeSermon.video_url}
                                        controls
                                        autoPlay
                                        className="w-full max-h-[420px]"
                                        title={activeSermon.title}
                                        onPlay={() => setIsPlaying(true)}
                                        onPause={() => setIsPlaying(false)}
                                        onEnded={() => stop()}
                                        onError={(e) => {
                                            const target = e.target as HTMLVideoElement;
                                            target.style.display = 'none';
                                            const parent = target.parentElement;
                                            if (parent) {
                                                const errorEl = document.createElement('div');
                                                errorEl.className = 'flex flex-col items-center justify-center py-12 text-slate-500';
                                                errorEl.innerHTML = '<span class="material-symbols-outlined text-4xl mb-3 opacity-40">error</span><p class="text-sm">Video format not supported or link is invalid.</p>';
                                                parent.appendChild(errorEl);
                                            }
                                        }}
                                    >
                                        Your browser does not support the video tag.
                                    </video>
                                    <div className="absolute top-4 right-4 z-10">
                                        <div className={`px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${isPlaying ? 'bg-[#1313ec]/40' : 'bg-black/60'}`}>
                                            <span className={`size-1.5 rounded-full ${isPlaying ? 'bg-[#1313ec] animate-pulse' : 'bg-slate-500'}`} />
                                            {isPlaying ? 'Playing' : 'Paused'}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Audio — we proxy the controls to the core if it's audio only, 
                        or show a separate UI if both exist. For now, let's keep it consistent.
                    */}
                    {hasAudio && (
                        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                             <div className="flex items-center gap-3 mb-4">
                                <div className="flex items-center justify-center size-10 rounded-full bg-[#1313ec]/20 text-[#1313ec]">
                                    <span className="material-symbols-outlined">headphones</span>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white">Audio Message</p>
                                    <p className="text-xs text-slate-500">Playing in background when minimized</p>
                                </div>
                            </div>
                            {/* In a real app we'd sync this with the core. 
                                For this demo, we'll keep the core handling the sound 
                                and just show status here.
                            */}
                            {/* Audio transport controls */}
                            <div className="flex flex-col items-center justify-center py-4 space-y-6">
                                <div className="flex items-center gap-6">
                                    <button className="text-slate-500 hover:text-white transition-colors">
                                        <span className="material-symbols-outlined text-3xl">replay_10</span>
                                    </button>
                                    <button 
                                        onClick={togglePlay}
                                        className="size-16 rounded-full bg-[#1313ec] hover:bg-[#1313ec]/80 flex items-center justify-center text-white shadow-xl shadow-[#1313ec]/40 transition-transform hover:scale-105 active:scale-95"
                                    >
                                        <span className="material-symbols-outlined text-4xl">
                                            {isPlaying ? 'pause' : 'play_arrow'}
                                        </span>
                                    </button>
                                    <button className="text-slate-500 hover:text-white transition-colors">
                                        <span className="material-symbols-outlined text-3xl">forward_10</span>
                                    </button>
                                </div>
                                <span className="text-[#1313ec] text-xs font-bold animate-pulse uppercase tracking-widest">
                                    {isPlaying ? 'Live Playback Active' : 'Playback Paused'}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* No media fallback */}
                    {hasNoMedia && (
                        <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500">
                            <span className="material-symbols-outlined text-4xl mb-3 opacity-40">videocam_off</span>
                            <p className="text-sm">No media is available for this sermon yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
