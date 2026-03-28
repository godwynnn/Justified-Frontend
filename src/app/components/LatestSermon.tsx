'use client';

import { useMedia } from '../context/MediaContext';
import Link from 'next/link';

interface Sermon {
    id: number;
    title: string;
    speaker: string;
    date: string;
    scripture?: string;
    video_url?: string;
    audio_url?: string;
    image_url?: string;
    notes_url?: string;
}

interface Props {
    sermon: Sermon;
}

export default function LatestSermon({ sermon }: Props) {
    const { playSermon } = useMedia();

    return (
        <section className="bg-background-dark py-24 relative z-40 border-t border-white/5">
            <div className="mx-auto max-w-[1440px] px-6 lg:px-20">
                <div className="mb-12 flex justify-between items-end">
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-[0.4em] text-[#1313ec] mb-4">Latest Message</h3>
                        <h2 className="text-4xl font-bold">{sermon.title}</h2>
                    </div>
                    <Link href="/sermons" className="text-[#1313ec] hover:text-white transition-colors flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                        All Messages <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                </div>

                <div className="border border-white/10 bg-[#000c1d] rounded-xl overflow-hidden flex flex-col md:flex-row items-center">
                    <div className="w-full md:w-1/2 h-64 md:h-96 relative">
                        <img 
                            src={sermon.image_url || "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2832&auto=format&fit=crop"} 
                            alt={sermon.title} 
                            className="w-full h-full object-cover grayscale mix-blend-luminosity opacity-80" 
                        />
                    </div>
                    <div className="p-10 md:p-16 w-full md:w-1/2">
                        <p className="text-sm text-[#1313ec] font-mono mb-4">{new Date(sermon.date).toLocaleDateString()}</p>
                        <h3 className="text-3xl font-bold mb-4">{sermon.speaker}</h3>
                        {sermon.scripture && (
                            <p className="text-slate-400 font-light mb-8 italic">"{sermon.scripture}"</p>
                        )}
                        <button 
                            onClick={() => playSermon(sermon)}
                            className="bg-white text-black px-8 py-4 rounded-lg font-bold hover:bg-[#1313ec] hover:text-white transition-all transform hover:-translate-y-1 active:translate-y-0 shadow-lg hover:shadow-[#1313ec]/20"
                        >
                            Listen Now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
