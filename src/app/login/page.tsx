'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api';

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch(`${API_BASE}/login/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.error || 'Login failed. Please check your credentials.');
                return;
            }

            login(data.token, data.user);
            router.push('/sermons');
        } catch (err) {
            setError('Could not connect to the server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#000814] text-white min-h-screen flex flex-col pt-24 px-6">
            <div className="mx-auto w-full max-w-md">
                <div className="text-center mb-10">
                    <div className="size-12 bg-[#1313ec] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#1313ec]/20">
                        <span className="material-symbols-outlined text-white text-2xl">lock_open</span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight uppercase">Welcome Back</h1>
                    <p className="text-slate-400 mt-2">Log in to your Justified Global account.</p>
                </div>

                <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-xl shadow-2xl">
                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3">
                            <span className="material-symbols-outlined text-base">error</span>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={form.email}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#1313ec]/60 focus:border-[#1313ec]/60 outline-none transition-all"
                                placeholder="name@example.com"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between ml-1">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Password</label>
                                <button type="button" className="text-[10px] font-bold text-[#1313ec] uppercase tracking-wider hover:underline">Forgot?</button>
                            </div>
                            <input
                                type="password"
                                name="password"
                                required
                                value={form.password}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#1313ec]/60 focus:border-[#1313ec]/60 outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#1313ec] hover:bg-[#1313ec]/90 disabled:opacity-50 text-white font-bold py-4 rounded-xl shadow-lg shadow-[#1313ec]/30 transition-all transform hover:-translate-y-0.5 mt-2"
                        >
                            {loading ? 'Logging In...' : 'Log In'}
                        </button>
                    </form>

                    <p className="text-center text-slate-400 text-sm mt-8">
                        New to Justified?{' '}
                        <Link href="/signup" className="text-[#1313ec] font-bold hover:underline">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
