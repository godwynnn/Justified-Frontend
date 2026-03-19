"use client";

import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Sending...');
        setTimeout(() => {
            setStatus('Message Sent Successfully!');
            setFormData({ name: '', email: '', message: '' });
        }, 1000);
    };

    return (
        <div className="bg-[#f6f6f8] dark:bg-[#000814] text-white min-h-screen pt-24 pb-24">
            {/* Header */}
            <div className="max-w-7xl mx-auto px-6 mb-16 mt-12 text-center">
                <p className="text-[#1313ec] tracking-[0.3em] uppercase text-sm font-bold mb-4">Reach Out</p>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-6">Contact Us</h1>
                <p className="text-xl text-white/70 font-light max-w-2xl mx-auto">
                    We would love to hear from you. Get in touch with our team for prayer, guidance, or information.
                </p>
            </div>

            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Contact Info */}
                <div className="space-y-12">
                    <div>
                        <h3 className="text-sm font-bold text-[#1313ec] uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Location</h3>
                        <p className="text-2xl text-white font-light">123 Faith Street<br />Metropolis, NY 10001</p>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-[#1313ec] uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Reach Us</h3>
                        <p className="text-2xl text-white font-light font-mono">+1 (234) 567-890<br />info@gracechurch.org</p>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-[#1313ec] uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Office Hours</h3>
                        <p className="text-xl text-white/50 font-mono">Monday -- Friday<br />9:00 AM -- 4:00 PM</p>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-[#000c1d] rounded-xl p-10 border border-white/10">
                    <h2 className="text-3xl font-bold tracking-tight mb-8">Send a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-[#1313ec] mb-2 font-bold">Full Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-[#1313ec] focus:ring-1 focus:ring-[#1313ec] transition-all placeholder-white/30"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-[#1313ec] mb-2 font-bold">Email Address</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-[#1313ec] focus:ring-1 focus:ring-[#1313ec] transition-all placeholder-white/30"
                                placeholder="john@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-[#1313ec] mb-2 font-bold">Your Message</label>
                            <textarea
                                required
                                rows={4}
                                value={formData.message}
                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-[#1313ec] focus:ring-1 focus:ring-[#1313ec] transition-all placeholder-white/30 resize-none"
                                placeholder="How can we help you?"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#1313ec] text-white py-4 font-bold rounded-lg transition-all shadow-lg shadow-[#1313ec]/20 hover:-translate-y-1 transform"
                        >
                            Submit Message
                        </button>
                        {status && <p className="text-center text-[#1313ec] mt-4 text-sm font-mono">{status}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}
