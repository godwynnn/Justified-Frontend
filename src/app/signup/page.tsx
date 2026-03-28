'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api';

export default function SignupPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
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
            const res = await fetch(`${API_BASE}/signup/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.error || 'Signup failed. Please try again.');
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
        <div className="bg-[#000814] text-white min-h-screen flex flex-col pt-20 px-6">
            <div className="mx-auto w-full max-w-md">
                <div className="text-center mb-10">
                    <div className="size-12 bg-[#1313ec] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#1313ec]/20">
                        <span className="material-symbols-outlined text-white text-2xl">person_add</span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight uppercase">Join Justified</h1>
                    <p className="text-slate-400 mt-2">Create an account to access special features.</p>
                </div>

                <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-xl shadow-2xl">
                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3">
                            <span className="material-symbols-outlined text-base">error</span>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">First Name</label>
                                <input
                                    type="text"
                                    name="first_name"
                                    required
                                    value={form.first_name}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#1313ec]/60 focus:border-[#1313ec]/60 outline-none transition-all"
                                    placeholder="John"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Last Name</label>
                                <input
                                    type="text"
                                    name="last_name"
                                    required
                                    value={form.last_name}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#1313ec]/60 focus:border-[#1313ec]/60 outline-none transition-all"
                                    placeholder="Doe"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={form.email}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#1313ec]/60 focus:border-[#1313ec]/60 outline-none transition-all"
                                placeholder="name@example.com"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                required
                                value={form.password}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#1313ec]/60 focus:border-[#1313ec]/60 outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#1313ec] hover:bg-[#1313ec]/90 disabled:opacity-50 text-white font-bold py-4 rounded-xl shadow-lg shadow-[#1313ec]/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 mt-2"
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </form>

                    <p className="text-center text-slate-400 text-sm mt-8">
                        Already have an account?{' '}
                        <Link href="/login" className="text-[#1313ec] font-bold hover:underline">Log In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
