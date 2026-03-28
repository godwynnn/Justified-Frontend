import Navbar from '../components/Navbar';

export default function Privacy() {
    return (
        <div className="bg-[#000814] text-white min-h-screen pt-24 pb-24 relative overflow-hidden">
            <Navbar />
            <div className="max-w-4xl mx-auto px-6 mb-16 mt-12 text-center">
                <p className="text-[#1313ec] tracking-[0.3em] uppercase text-sm font-bold mb-4">Legal</p>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-6">Privacy Policy</h1>
                <p className="text-xl text-white/70 font-light mx-auto">
                    Your privacy is important to us.
                </p>
            </div>
            
            <div className="max-w-4xl mx-auto px-6 space-y-8 text-white/70 font-light">
                <section className="bg-[#000c1d] rounded-xl p-10 border border-white/10">
                    <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
                    <p className="leading-relaxed">We may collect personal information such as your name, email address, and other details when you interact with our website or services.</p>
                </section>
                <section className="bg-[#000c1d] rounded-xl p-10 border border-white/10">
                    <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
                    <p className="leading-relaxed">Your information is used to improve our services, communicate with you, and ensure a better experience on our platform. We do not sell your personal data to third parties.</p>
                </section>
                <section className="bg-[#000c1d] rounded-xl p-10 border border-white/10">
                    <h2 className="text-2xl font-bold text-white mb-4">Security</h2>
                    <p className="leading-relaxed">We implement appropriate security measures to protect your information against unauthorized access, alteration, disclosure, or destruction.</p>
                </section>
                <section className="bg-[#000c1d] rounded-xl p-10 border border-white/10">
                    <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
                    <p className="leading-relaxed">If you have any questions about this Privacy Policy, please contact us at <span className="text-[#1313ec] font-bold">justifiedglobalministries@gmail.com</span>.</p>
                </section>
            </div>
        </div>
    );
}
