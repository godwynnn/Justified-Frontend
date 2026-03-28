'use client';

import { useState, useEffect } from 'react';
import { useMedia } from '../context/MediaContext';

interface Sermon {
    id: number;
    title: string;
    speaker: string;
    date: string;
    image_url?: string;
    audio_url?: string;
    video_url?: string;
}

export default function QuickPlayButton() {
    const { activeSermon, playSermon } = useMedia();
    const [latestSermon, setLatestSermon] = useState<Sermon | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Only fetch if no sermon is active
        if (!activeSermon && !latestSermon) {
            const fetchLatest = async () => {
                setLoading(true);
                try {
                    const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api';
                    const res = await fetch(`${API_BASE}/sermons/`);
                    if (res.ok) {
                        const data = await res.json();
                        if (data.length > 0) {
                            setLatestSermon(data[0]);
                        }
                    }
                } catch (error) {
                    console.error("QuickPlayButton: Failed to fetch latest sermon", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchLatest();
        }
    }, [activeSermon, latestSermon]);

    // Hide if a sermon is already active or we couldn't find a latest sermon
    if (activeSermon || !latestSermon) return null;

    return (
        <div className="fixed bottom-8 right-8 z-[100] group">
            <div className="absolute -inset-4 bg-[#1313ec]/20 rounded-full blur-2xl group-hover:bg-[#1313ec]/40 transition-colors pointer-events-none animate-pulse" />
            <button
                onClick={() => playSermon(latestSermon)}
                disabled={loading}
                className="relative flex items-center gap-3 bg-[#1313ec] hover:bg-[#1313ec]/80 text-white px-6 py-4 rounded-full shadow-2xl shadow-[#1313ec]/40 transition-all transform hover:-translate-y-2 active:scale-95 group"
                aria-label="Play Latest Sermon"
            >
                <div className="flex items-center justify-center size-8 rounded-full bg-white/20 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-white">play_arrow</span>
                </div>
                <div className="flex flex-col items-start leading-none pr-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">Play Latest</span>
                    <span className="text-sm font-bold truncate max-w-[120px]">{latestSermon.title}</span>
                </div>
            </button>
        </div>
    );
}
