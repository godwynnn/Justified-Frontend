"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import SermonForm, { SermonFormData } from '../../../components/SermonForm';
import { useAuth } from '../../../context/AuthContext';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api';

export default function EditSermon() {
    const params = useParams();
    const router = useRouter();
    const id = params.id;
    const { isAuthenticated, loading: authLoading } = useAuth();
    const [initialData, setInitialData] = useState<(SermonFormData & { image_url?: string; video_url?: string }) | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, authLoading, router]);

    useEffect(() => {
        async function fetchSermon() {
            try {
                const res = await fetch(`${API_BASE}/sermons/${id}/`);
                if (!res.ok) throw new Error('Failed to fetch sermon');
                const data = await res.json();

                // Map API response to form data (handling nulls)
                setInitialData({
                    title: data.title || '',
                    speaker: data.speaker || '',
                    date: data.date || '',
                    description: data.description || '',
                    audio_url: data.audio_url || '',
                    notes_url: data.notes_url || '',
                    image_url: data.image_url || '',
                    video_url: data.video_url || '',
                });
            } catch (err) {
                setError('Could not load sermon. It may have been deleted.');
            } finally {
                setLoading(false);
            }
        }
        fetchSermon();
    }, [id]);

    if (authLoading || !isAuthenticated) {
        return <div className="min-h-screen bg-[#000814]" />;
    }

    return (
        <div className="bg-[#000814] text-white min-h-screen">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#000814]/80 backdrop-blur-md px-6 lg:px-20 py-5">
                <nav className="mx-auto flex max-w-[1440px] items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="size-8 bg-[#1313ec] rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-xl">church</span>
                        </div>
                        <Link href="/" className="text-xl font-bold tracking-tight uppercase">Justified</Link>
                    </div>
                    <Link
                        href="/sermons"
                        className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                    >
                        <span className="material-symbols-outlined text-base">arrow_back</span>
                        Back to Sermons
                    </Link>
                </nav>
            </header>

            <main className="mx-auto max-w-3xl px-6 lg:px-8 py-16 md:py-24">
                {/* Page heading */}
                <div className="mb-12">
                    <span className="inline-block text-xs font-bold uppercase tracking-[0.4em] text-[#1313ec] mb-4">Admin</span>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Edit Sermon</h1>
                    <p className="mt-4 text-slate-400 font-light">
                        Modify the details of this message.
                    </p>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 space-y-4">
                        <span className="material-symbols-outlined text-4xl animate-spin text-[#1313ec]">progress_activity</span>
                        <p className="text-slate-400 text-sm">Loading sermon details...</p>
                    </div>
                ) : error ? (
                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-6 py-12 text-center">
                        <span className="material-symbols-outlined text-4xl text-red-500 mb-4">error</span>
                        <p className="text-red-400">{error}</p>
                        <Link href="/sermons" className="inline-block mt-6 text-[#1313ec] hover:underline font-bold">Return to Library</Link>
                    </div>
                ) : (
                    <SermonForm mode="edit" initialData={initialData!} sermonId={Number(id)} />
                )}
            </main>
        </div>
    );
}
