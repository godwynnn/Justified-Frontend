'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const API_BASE = 'http://127.0.0.1:8000/api';

export interface SermonFormData {
    title: string;
    speaker: string;
    date: string;
    scripture: string;
    video_url: string;
    audio_url: string;
    notes_url: string;
}

interface Props {
    initialData?: SermonFormData;
    sermonId?: number;
    mode: 'create' | 'edit';
}

const INITIAL: SermonFormData = {
    title: '',
    speaker: '',
    date: '',
    scripture: '',
    video_url: '',
    audio_url: '',
    notes_url: '',
};

export default function SermonForm({ initialData, sermonId, mode }: Props) {
    const router = useRouter();
    const { token } = useAuth();
    const [form, setForm] = useState<SermonFormData>(initialData || INITIAL);
    const [errors, setErrors] = useState<Partial<SermonFormData>>({});
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState('');

    useEffect(() => {
        if (initialData) setForm(initialData);
    }, [initialData]);

    function validate(): boolean {
        const e: Partial<SermonFormData> = {};
        if (!form.title.trim()) e.title = 'Title is required.';
        if (!form.speaker.trim()) e.speaker = 'Speaker is required.';
        if (!form.date) e.date = 'Date is required.';
        setErrors(e);
        return Object.keys(e).length === 0;
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: undefined }));
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        setServerError('');

        const payload = Object.fromEntries(
            Object.entries(form).map(([k, v]) => [k, v === '' ? null : v])
        );

        const url = mode === 'create' 
            ? `${API_BASE}/sermons/` 
            : `${API_BASE}/sermons/${sermonId}/`;
        
        const method = mode === 'create' ? 'POST' : 'PUT';

        try {
            const res = await fetch(url, {
                method,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => null);
                const msg = data
                    ? Object.values(data).flat().join(' ')
                    : 'Something went wrong. Please try again.';
                setServerError(msg);
                return;
            }

            router.push('/sermons');
            router.refresh(); // Ensure the grid updates
        } catch {
            setServerError('Could not reach the server. Make sure the backend is running.');
        } finally {
            setLoading(false);
        }
    }

    const fields: {
        id: keyof SermonFormData;
        label: string;
        type: string;
        required?: boolean;
        placeholder: string;
        icon: string;
    }[] = [
        { id: 'title', label: 'Sermon Title', type: 'text', required: true, placeholder: 'e.g. Grace in the Storm', icon: 'title' },
        { id: 'speaker', label: 'Speaker', type: 'text', required: true, placeholder: 'e.g. Pastor John', icon: 'person' },
        { id: 'date', label: 'Date', type: 'date', required: true, placeholder: '', icon: 'calendar_today' },
        { id: 'scripture', label: 'Scripture Reference', type: 'text', placeholder: 'e.g. Romans 8:28', icon: 'menu_book' },
        { id: 'video_url', label: 'Video URL', type: 'url', placeholder: 'https://youtube.com/...', icon: 'play_circle' },
        { id: 'audio_url', label: 'Audio URL', type: 'url', placeholder: 'https://...', icon: 'headphones' },
        { id: 'notes_url', label: 'Thumbnail / Notes URL', type: 'url', placeholder: 'https://...', icon: 'image' },
    ];

    return (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {serverError && (
                <div className="mb-8 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-400 text-sm animate-in fade-in slide-in-from-top-2">
                    <span className="material-symbols-outlined text-base mt-0.5 shrink-0">error</span>
                    <span>{serverError}</span>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.slice(0, 3).map(f => (
                    <div key={f.id} className={f.id === 'title' ? 'md:col-span-2' : ''}>
                        <label htmlFor={f.id} className="block text-sm font-semibold mb-2 text-slate-300">
                            {f.label}
                            {f.required && <span className="text-[#1313ec] ml-1">*</span>}
                        </label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xl pointer-events-none">
                                {f.icon}
                            </span>
                            <input
                                id={f.id}
                                name={f.id}
                                type={f.type}
                                value={form[f.id] || ''}
                                onChange={handleChange}
                                placeholder={f.placeholder}
                                className={`w-full bg-white/5 border rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-slate-600 outline-none transition-all focus:ring-2 focus:ring-[#1313ec]/60 focus:border-[#1313ec]/60 ${
                                    errors[f.id] ? 'border-red-500/60 bg-red-500/5' : 'border-white/10 hover:border-white/20'
                                }`}
                            />
                        </div>
                        {errors[f.id] && (
                            <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">error</span>
                                {errors[f.id]}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            <div className="border-t border-white/5 pt-6">
                <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 mb-6">Optional Media &amp; Resources</h2>
                <div className="space-y-6">
                    {fields.slice(3).map(f => (
                        <div key={f.id}>
                            <label htmlFor={f.id} className="block text-sm font-semibold mb-2 text-slate-300">
                                {f.label}
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xl pointer-events-none">
                                    {f.icon}
                                </span>
                                <input
                                    id={f.id}
                                    name={f.id}
                                    type={f.type}
                                    value={form[f.id] || ''}
                                    onChange={handleChange}
                                    placeholder={f.placeholder}
                                    className="w-full bg-white/5 border border-white/10 hover:border-white/20 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-slate-600 outline-none transition-all focus:ring-2 focus:ring-[#1313ec]/60 focus:border-[#1313ec]/60"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/5">
                <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 bg-[#1313ec] hover:bg-[#1313ec]/80 disabled:opacity-50 disabled:cursor-not-allowed text-white h-12 px-8 rounded-xl font-bold text-sm transition-all transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#1313ec]/30"
                >
                    {loading ? (
                        <>
                            <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>
                            Saving…
                        </>
                    ) : (
                        <>
                            <span className="material-symbols-outlined text-base">{mode === 'create' ? 'upload' : 'save'}</span>
                            {mode === 'create' ? 'Publish Sermon' : 'Save Changes'}
                        </>
                    )}
                </button>
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex items-center gap-2 border border-white/10 hover:bg-white/5 text-white h-12 px-8 rounded-xl font-bold text-sm transition-all"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
