"use client"
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SermonForm from '../../components/SermonForm';
import { useAuth } from '../../context/AuthContext';

export default function NewSermon() {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, loading, router]);

    if (loading || !isAuthenticated) {
        return <div className="min-h-screen bg-[#000814]" />;
    }
    return (
        <div className="bg-[#000814] text-white min-h-screen">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#000814]/80 backdrop-blur-md px-6 lg:px-20 py-5">
                <nav className="mx-auto flex max-w-[1440px] items-center justify-between">
                    <Link href="/" className="flex items-center group">
                        <img
                            src="/logo.png"
                            alt="Justified Logo"
                            className="h-10 md:h-12 w-auto object-contain group-hover:scale-105 transition-transform"
                        />
                    </Link>
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
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Add New Sermon</h1>
                    <p className="mt-4 text-slate-400 font-light">
                        Fill in the details below to publish a new message to the library.
                    </p>
                </div>

                <SermonForm mode="create" />
            </main>
        </div>
    );
}
