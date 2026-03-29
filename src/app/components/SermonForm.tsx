'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef, FormEvent, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api';

export interface SermonFormData {
    title: string;
    speaker: string;
    date: string;
    description: string;
    audio_url: string;
    notes_url: string;
}

interface Props {
    initialData?: SermonFormData & { image_url?: string; video_url?: string; audio_url?: string };
    sermonId?: number;
    mode: 'create' | 'edit';
}

const INITIAL: SermonFormData = {
    title: '',
    speaker: '',
    date: '',
    description: '',
    audio_url: '',
    notes_url: '',
};

export default function SermonForm({ initialData, sermonId, mode }: Props) {
    const router = useRouter();
    const { token } = useAuth();
    const [form, setForm] = useState<SermonFormData>(initialData || INITIAL);
    const [mediaType, setMediaType] = useState<'video' | 'audio'>(
        initialData?.audio_url && !initialData?.video_url ? 'audio' : 'video'
    );
    const [errors, setErrors] = useState<Partial<SermonFormData>>({});
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState('');

    // File state
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>(initialData?.image_url || '');
    const [videoFileName, setVideoFileName] = useState<string>('');
    const [audioFileName, setAudioFileName] = useState<string>('');

    const imageInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);
    const audioInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (initialData) {
            setForm(initialData);
            setImagePreview(initialData.image_url || '');
            if (initialData.audio_url && !initialData.video_url) {
                setMediaType('audio');
            } else {
                setMediaType('video');
            }
        }
    }, [initialData]);

    function validate(): boolean {
        const e: Partial<SermonFormData> = {};
        if (!form.title.trim()) e.title = 'Title is required.';
        if (!form.speaker.trim()) e.speaker = 'Speaker is required.';
        if (!form.date) e.date = 'Date is required.';
        setErrors(e);
        return Object.keys(e).length === 0;
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: undefined }));
    }

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    }

    function handleVideoChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            setVideoFile(file);
            setVideoFileName(file.name);
        }
    }

    function handleAudioChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            setAudioFile(file);
            setAudioFileName(file.name);
        }
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        setServerError('');

        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('speaker', form.speaker);
        formData.append('date', form.date);
        if (form.description) formData.append('description', form.description);
        if (form.audio_url) formData.append('audio_url', form.audio_url);
        if (form.notes_url) formData.append('notes_url', form.notes_url);

        if (imageFile) formData.append('image_file', imageFile);
        if (videoFile) formData.append('video_file', videoFile);
        if (audioFile) formData.append('audio_file', audioFile);

        const url = mode === 'create'
            ? `${API_BASE}/sermons/`
            : `${API_BASE}/sermons/${sermonId}/`;

        const method = mode === 'create' ? 'POST' : 'PUT';

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Authorization': `Token ${token}`,
                    // Do NOT set Content-Type — browser sets it with boundary for FormData
                },
                body: formData,
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
            router.refresh();
        } catch {
            setServerError('Could not reach the server. Make sure the backend is running.');
        } finally {
            setLoading(false);
        }
    }

    const textFields: {
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
        { id: 'description', label: 'Description', type: 'text', placeholder: 'Brief description of the sermon', icon: 'menu_book' },
        { id: 'audio_url', label: 'Audio URL', type: 'url', placeholder: 'https://...', icon: 'headphones' },
        { id: 'notes_url', label: 'Notes URL', type: 'url', placeholder: 'https://...', icon: 'description' },
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-8 bg-white/5 border border-white/10 p-8 md:p-12 rounded-2xl backdrop-blur-xl shadow-2xl relative overflow-hidden">
            {/* Form Decorative Logo */}
            <div className="flex justify-center mb-10">
                <img 
                    src="/logo.png" 
                    alt="Justified Logo" 
                    className="h-16 w-auto object-contain opacity-80 filter brightness-110" 
                />
            </div>

            {serverError && (
                <div className="mb-8 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-400 text-sm animate-in fade-in slide-in-from-top-2">
                    <span className="material-symbols-outlined text-base mt-0.5 shrink-0">error</span>
                    <span>{serverError}</span>
                </div>
            )}

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {textFields.slice(0, 3).map(f => (
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

            {/* Description */}
            <div>
                <label htmlFor="description" className="block text-sm font-semibold mb-2 text-slate-300">
                    Description
                </label>
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-4 text-slate-500 text-xl pointer-events-none">
                        menu_book
                    </span>
                    <textarea
                        id="description"
                        name="description"
                        value={form.description || ''}
                        onChange={handleChange}
                        placeholder="Brief description of the sermon"
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 hover:border-white/20 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-slate-600 outline-none transition-all focus:ring-2 focus:ring-[#1313ec]/60 focus:border-[#1313ec]/60 resize-none"
                    />
                </div>
            </div>

            {/* File Uploads Section */}
            <div className="border-t border-white/5 pt-6">
                <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 mb-6">Media &amp; Resources</h2>

                {/* Thumbnail Image Upload */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2 text-slate-300">
                        Thumbnail Image
                    </label>
                    <div
                        onClick={() => imageInputRef.current?.click()}
                        className="group cursor-pointer border-2 border-dashed border-white/10 hover:border-[#1313ec]/40 rounded-xl p-6 text-center transition-all hover:bg-white/[0.02]"
                    >
                        {imagePreview ? (
                            <div className="relative">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="max-h-48 mx-auto rounded-lg object-cover"
                                />
                                <div className="mt-3 text-xs text-slate-500 group-hover:text-slate-300 transition-colors">
                                    Click to change image
                                </div>
                            </div>
                        ) : (
                            <div className="py-4">
                                <span className="material-symbols-outlined text-4xl text-slate-600 group-hover:text-[#1313ec] transition-colors">
                                    cloud_upload
                                </span>
                                <p className="mt-2 text-sm text-slate-500 group-hover:text-slate-300 transition-colors">
                                    Click to upload thumbnail image
                                </p>
                                <p className="mt-1 text-xs text-slate-600">
                                    JPG, PNG, WebP up to 10MB
                                </p>
                            </div>
                        )}
                    </div>
                    <input
                        ref={imageInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </div>

                {/* Media Type Toggle */}
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Sermon Media</h3>
                    <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
                        <button
                            type="button"
                            onClick={() => setMediaType('video')}
                            className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
                                mediaType === 'video' ? 'bg-[#1313ec] text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
                            }`}
                        >
                            Video
                        </button>
                        <button
                            type="button"
                            onClick={() => setMediaType('audio')}
                            className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
                                mediaType === 'audio' ? 'bg-[#1313ec] text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
                            }`}
                        >
                            Audio
                        </button>
                    </div>
                </div>

                {/* Video File Upload */}
                {mediaType === 'video' && (
                    <div className="mb-6 animate-in fade-in slide-in-from-left-2 duration-300">
                        <label className="block text-sm font-semibold mb-2 text-slate-300">
                            Video File
                        </label>
                        <div
                            onClick={() => videoInputRef.current?.click()}
                            className="group cursor-pointer border-2 border-dashed border-white/10 hover:border-[#1313ec]/40 rounded-xl p-6 text-center transition-all hover:bg-white/[0.02]"
                        >
                            {videoFileName ? (
                                <div className="flex items-center justify-center gap-3">
                                    <span className="material-symbols-outlined text-2xl text-[#1313ec]">
                                        videocam
                                    </span>
                                    <div className="text-left">
                                        <p className="text-sm text-white font-medium">{videoFileName}</p>
                                        <p className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors">Click to change video</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="py-4">
                                    <span className="material-symbols-outlined text-4xl text-slate-600 group-hover:text-[#1313ec] transition-colors">
                                        video_call
                                    </span>
                                    <p className="mt-2 text-sm text-slate-500 group-hover:text-slate-300 transition-colors">
                                        Click to upload sermon video
                                    </p>
                                    <p className="mt-1 text-xs text-slate-600">
                                        MP4, MOV, AVI up to 500MB
                                    </p>
                                </div>
                            )}
                        </div>
                        <input
                            ref={videoInputRef}
                            type="file"
                            accept="video/*"
                            onChange={handleVideoChange}
                            className="hidden"
                        />
                    </div>
                )}

                {/* Audio File Upload */}
                {mediaType === 'audio' && (
                    <div className="mb-6 animate-in fade-in slide-in-from-left-2 duration-300">
                        <label className="block text-sm font-semibold mb-2 text-slate-300">
                            Audio File
                        </label>
                        <div
                            onClick={() => audioInputRef.current?.click()}
                            className="group cursor-pointer border-2 border-dashed border-white/10 hover:border-[#1313ec]/40 rounded-xl p-6 text-center transition-all hover:bg-white/[0.02]"
                        >
                            {audioFileName ? (
                                <div className="flex items-center justify-center gap-3">
                                    <span className="material-symbols-outlined text-2xl text-[#1313ec]">
                                        headphones
                                    </span>
                                    <div className="text-left">
                                        <p className="text-sm text-white font-medium">{audioFileName}</p>
                                        <p className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors">Click to change audio</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="py-4">
                                    <span className="material-symbols-outlined text-4xl text-slate-600 group-hover:text-[#1313ec] transition-colors">
                                        headphones
                                    </span>
                                    <p className="mt-2 text-sm text-slate-500 group-hover:text-slate-300 transition-colors">
                                        Click to upload sermon audio
                                    </p>
                                    <p className="mt-1 text-xs text-slate-600">
                                        MP3, WAV, AAC up to 100MB
                                    </p>
                                </div>
                            )}
                        </div>
                        <input
                            ref={audioInputRef}
                            type="file"
                            accept="audio/*"
                            onChange={handleAudioChange}
                            className="hidden"
                        />
                    </div>
                )}

                {/* Notes URL (remains a text input) */}
                <div>
                    <label htmlFor="notes_url" className="block text-sm font-semibold mb-2 text-slate-300">
                        Notes URL
                    </label>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xl pointer-events-none">
                            description
                        </span>
                        <input
                            id="notes_url"
                            name="notes_url"
                            type="url"
                            value={form.notes_url || ''}
                            onChange={handleChange}
                            placeholder="https://..."
                            className="w-full bg-white/5 border border-white/10 hover:border-white/20 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-slate-600 outline-none transition-all focus:ring-2 focus:ring-[#1313ec]/60 focus:border-[#1313ec]/60"
                        />
                    </div>
                </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/5">
                <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 bg-[#1313ec] hover:bg-[#1313ec]/80 disabled:opacity-50 disabled:cursor-not-allowed text-white h-12 px-8 rounded-xl font-bold text-sm transition-all transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#1313ec]/30"
                >
                    {loading ? (
                        <>
                            <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>
                            Uploading…
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
