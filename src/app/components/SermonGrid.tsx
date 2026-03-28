'use client';

import { useMedia } from '../context/MediaContext';
import { useAuth } from '../context/AuthContext';
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
    sermons: Sermon[];
    featuredSermon: Sermon | null;
}

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=2940&auto=format&fit=crop';
const FEATURED_FALLBACK = 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2832&auto=format&fit=crop';

function mediaLabel(sermon: Sermon) {
    if (sermon.video_url) return 'Watch';
    if (sermon.audio_url) return 'Listen';
    return 'No media';
}

function mediaIcon(sermon: Sermon) {
    if (sermon.video_url) return 'play_circle';
    if (sermon.audio_url) return 'headphones';
    return 'videocam_off';
}

export default function SermonGrid({ sermons, featuredSermon }: Props) {
    const { playSermon } = useMedia();
    const { isAuthenticated } = useAuth();

    return (
        <>
            {/* Featured hero — "Watch Now" button */}
            {featuredSermon && (
                <section className="py-8">
                    <div className="relative h-[500px] lg:h-[600px] w-full rounded-xl overflow-hidden group">
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            style={{ backgroundImage: `url('${featuredSermon.image_url || FEATURED_FALLBACK}')` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#000814]/95 via-[#000814]/40 to-[#000814]/10 flex flex-col justify-end p-8 lg:p-16">
                            <div className="max-w-3xl space-y-4">
                                <div className="flex items-center gap-3">
                                    <span className="bg-[#1313ec] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded">Latest Message</span>
                                    <span className="text-white/60 text-sm font-medium">
                                        {new Date(featuredSermon.date).toLocaleDateString()}
                                    </span>
                                </div>
                                <h1 className="text-4xl lg:text-7xl font-bold leading-tight tracking-tight uppercase">
                                    {featuredSermon.title}
                                </h1>
                                {featuredSermon.scripture && (
                                    <p className="text-lg text-white/70 max-w-xl">
                                        &ldquo;{featuredSermon.scripture}&rdquo;
                                    </p>
                                )}
                                <div className="flex flex-wrap items-center gap-4 pt-4">
                                    <button
                                        onClick={() => playSermon(featuredSermon)}
                                        className="flex items-center gap-2 bg-[#1313ec] hover:bg-[#1313ec]/80 px-8 py-4 rounded-xl text-base font-bold transition-all transform hover:-translate-y-1"
                                    >
                                        <span className="material-symbols-outlined">
                                            {featuredSermon.video_url ? 'play_circle' : 'headphones'}
                                        </span>
                                        {mediaLabel(featuredSermon)} Now
                                    </button>
                                    {isAuthenticated && (
                                        <Link 
                                            href={`/sermons/${featuredSermon.id}/edit`}
                                            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-8 py-4 rounded-xl text-base font-bold transition-all border border-white/10"
                                        >
                                            <span className="material-symbols-outlined">edit</span> Edit Sermon
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Sermon cards grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {sermons.map((sermon) => {
                    const hasMedia = !!(sermon.video_url || sermon.audio_url);
                    return (
                        <div
                            key={sermon.id}
                            className="group cursor-pointer"
                            onClick={() => playSermon(sermon)}
                        >
                            <div className="relative aspect-video rounded-xl overflow-hidden mb-4 ring-1 ring-white/10 transition-all group-hover:ring-[#1313ec]/50 group-hover:shadow-[0_0_20px_rgba(19,19,236,0.3)]">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                    style={{ backgroundImage: `url('${sermon.image_url || FALLBACK_IMG}')` }}
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />

                                {/* Duration badge / media type */}
                                <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-md text-[10px] font-bold px-2 py-1 rounded border border-white/10">
                                    <span className="material-symbols-outlined text-xs">{mediaIcon(sermon)}</span>
                                    {sermon.video_url ? 'Video' : sermon.audio_url ? 'Audio' : 'No Media'}
                                </div>

                                {/* Play overlay */}
                                {hasMedia && (
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="bg-[#1313ec] size-12 rounded-full flex items-center justify-center shadow-xl shadow-[#1313ec]/40 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                            <span className="material-symbols-outlined">
                                                {sermon.video_url ? 'play_arrow' : 'headphones'}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {isAuthenticated && (
                                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                        <Link 
                                            href={`/sermons/${sermon.id}/edit`}
                                            onClick={(e) => e.stopPropagation()}
                                            className="size-8 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-[#1313ec] transition-colors"
                                            title="Edit Sermon"
                                        >
                                            <span className="material-symbols-outlined text-sm">edit</span>
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <h3 className="font-bold text-lg group-hover:text-[#1313ec] transition-colors line-clamp-1">
                                {sermon.title}
                            </h3>
                            <div className="flex items-center justify-between mt-2 text-white/40 text-sm">
                                <span>{sermon.speaker}</span>
                                <span>{new Date(sermon.date).toLocaleDateString()}</span>
                            </div>
                        </div>
                    );
                })}
            </section>
        </>
    );
}
