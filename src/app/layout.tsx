import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

export const metadata: Metadata = {
    title: 'Justified Global',
    description: 'A space for the creative soul.',
};

import { AuthProvider } from './context/AuthContext';
import { MediaProvider } from './context/MediaContext';
import SermonPlayer from './components/SermonPlayer';
import SermonFloatingBar from './components/SermonFloatingBar';
import QuickPlayButton from './components/QuickPlayButton';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`dark ${spaceGrotesk.variable}`}>
            <head>
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet" />
            </head>
            <body className="bg-[#000814] text-white selection:bg-[#1313ec] selection:text-white font-sans antialiased">
                <AuthProvider>
                    <MediaProvider>
                        <div className="relative flex min-h-screen flex-col overflow-x-hidden">
                            {children}
                        </div>
                        <SermonPlayer />
                        <SermonFloatingBar />
                        <QuickPlayButton />
                    </MediaProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
