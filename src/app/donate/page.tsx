import Navbar from '../components/Navbar';

export default function Donate() {
    return (
        <div className="bg-[#000814] text-white min-h-screen pt-24 pb-24 relative overflow-hidden">
            <Navbar />
            {/* Header */}
            <div className="max-w-4xl mx-auto px-6 mb-16 mt-12 text-center">
                <p className="text-[#1313ec] tracking-[0.3em] uppercase text-sm font-bold mb-4">Generosity</p>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-6">Partner With Us</h1>
                <p className="text-xl text-white/70 font-light mx-auto">
                    "Each of you should give what you have decided in your heart to give." — 2 Cor 9:7
                </p>
            </div>

            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Why We Give */}
                <div>
                    <div className="aspect-[4/3] bg-[#000c1d] rounded-xl border border-white/5 mb-8 relative overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1593113560732-a7457a412469?q=80&w=2940&auto=format&fit=crop" alt="Outreach" className="w-full h-full object-cover grayscale opacity-50 mix-blend-luminosity" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight mb-6">Support the Mission</h2>
                    <p className="text-white/70 mb-6 font-light leading-relaxed">
                        Your generosity helps us spread the Gospel, support community outreach programs, help those in need across the city, and maintain our daily church operations. We believe giving is an act of worship.
                    </p>
                    <ul className="space-y-4 font-mono text-sm text-[#1313ec]">
                        <li className="flex items-center gap-4"><span className="material-symbols-outlined">arrow_forward</span> Spread the Gospel globally</li>
                        <li className="flex items-center gap-4"><span className="material-symbols-outlined">arrow_forward</span> Fund local community outreach</li>
                        <li className="flex items-center gap-4"><span className="material-symbols-outlined">arrow_forward</span> Maintain operations & sanctuary</li>
                    </ul>
                </div>

                {/* Giving Options */}
                <div className="space-y-8">
                    {/* Online Giving */}
                    <div className="bg-[#000c1d] rounded-xl p-10 border border-white/10 hover:border-[#1313ec]/50 transition-colors">
                        <h3 className="text-2xl font-bold tracking-tight mb-4 text-white hover:text-[#1313ec] transition-colors">Online Donation</h3>
                        <p className="text-white/70 mb-8 font-light">Securely give one-time or setup recurring gifts using our digital platform.</p>
                        <button className="w-full bg-[#1313ec] text-white py-4 rounded-lg font-bold transition-colors shadow-lg shadow-[#1313ec]/20 hover:-translate-y-1 transform">
                            Give Online Now
                        </button>
                    </div>

                    {/* Bank Transfer */}
                    <div className="bg-[#000c1d] rounded-xl p-10 border border-white/10">
                        <h3 className="text-2xl font-bold tracking-tight mb-6 text-white">Bank Transfer</h3>
                        <div className="space-y-4 font-mono text-sm text-white/70">
                            <div className="flex justify-between border-b border-white/10 pb-4">
                                <span className="text-white/40">Bank</span>
                                <span className="text-right text-[#1313ec]">Example Bank</span>
                            </div>
                            <div className="flex justify-between border-b border-white/10 pb-4">
                                <span className="text-white/40">Account Name</span>
                                <span className="text-right text-[#1313ec]">Grace Church</span>
                            </div>
                            <div className="flex justify-between border-b border-white/10 pb-4">
                                <span className="text-white/40">Account Number</span>
                                <span className="text-right text-white">1234567890</span>
                            </div>
                            <div className="flex justify-between pb-2">
                                <span className="text-white/40">Routing Code</span>
                                <span className="text-right text-white">XYZ1234</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
