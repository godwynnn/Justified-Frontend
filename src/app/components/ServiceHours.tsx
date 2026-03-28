'use client';

import React, { useEffect, useState } from 'react';

interface Service {
    id: number;
    name: string;
    service_type: 'worship' | 'bible_study' | 'prayer';
    day_of_week: string;
    start_time: string;
    end_time: string | null;
    is_active: boolean;
}

const ServiceHours = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api';
                const res = await fetch(`${API_BASE}/services/`);
                if (res.ok) {
                    const data = await res.json();
                    setServices(data.filter((s: Service) => s.is_active));
                }
            } catch (error) {
                console.error("Failed to fetch services:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const getIcon = (type: string) => {
        switch (type) {
            case 'worship': return 'auto_awesome';
            case 'bible_study': return 'menu_book';
            case 'prayer': return 'volunteer_activism';
            default: return 'event';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#1313ec]"></div>
            </div>
        );
    }

    if (services.length === 0) return null;

    return (
        <section className="py-24 bg-[#000c1d] border-y border-white/5 relative z-40">
            <div className="mx-auto max-w-[1440px] px-6 lg:px-20">
                <div className="mb-16 text-center">
                    <h3 className="text-sm font-bold uppercase tracking-[0.4em] text-[#1313ec] mb-4">Gatherings</h3>
                    <h2 className="text-4xl font-bold">Service Hours</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <div key={service.id} className="group relative bg-[#000814] border border-white/10 p-8 rounded-2xl hover:border-[#1313ec]/40 transition-all duration-500 overflow-hidden">
                            {/* Accent Background Glow */}
                            <div className="absolute -top-24 -right-24 size-48 bg-[#1313ec]/5 blur-3xl group-hover:bg-[#1313ec]/10 transition-colors"></div>
                            
                            <div className="relative z-10">
                                <span className="material-symbols-outlined text-[#1313ec] mb-6 block text-3xl group-hover:scale-110 transition-transform origin-left">
                                    {getIcon(service.service_type)}
                                </span>
                                <h4 className="text-2xl font-bold mb-2">{service.name}</h4>
                                <p className="text-[#1313ec] font-mono text-sm uppercase tracking-widest mb-6">
                                    {service.day_of_week}
                                </p>
                                
                                <div className="flex items-center gap-4 text-slate-400 font-light border-t border-white/5 pt-6">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm">schedule</span>
                                        <span>
                                            {service.start_time.slice(0, 5)} 
                                            {service.end_time ? ` — ${service.end_time.slice(0, 5)}` : ''}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceHours;
