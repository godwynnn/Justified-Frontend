'use client';

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import SermonMediaCore from '../components/SermonMediaCore';

interface Sermon {
    id: number;
    title: string;
    speaker: string;
    date: string;
    scripture?: string;
    video_url?: string;
    audio_url?: string;
    notes_url?: string;
}

interface MediaContextType {
    activeSermon: Sermon | null;
    isPlaying: boolean;
    isMinimized: boolean;
    playSermon: (sermon: Sermon) => void;
    togglePlay: () => void;
    setIsPlaying: (playing: boolean) => void;
    setMinimized: (minimized: boolean) => void;
    stop: () => void;
}

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export function MediaProvider({ children }: { children: React.ReactNode }) {
    const [activeSermon, setActiveSermon] = useState<Sermon | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    const playSermon = (sermon: Sermon) => {
        setActiveSermon(sermon);
        setIsPlaying(true);
        setIsMinimized(false);
    };

    const togglePlay = () => setIsPlaying(!isPlaying);

    const setMinimized = (minimized: boolean) => {
        setIsMinimized(minimized);
    };

    const stop = () => {
        setActiveSermon(null);
        setIsPlaying(false);
        setIsMinimized(false);
    };

    return (
        <MediaContext.Provider value={{
            activeSermon,
            isPlaying,
            isMinimized,
            playSermon,
            togglePlay,
            setIsPlaying,
            setMinimized,
            stop
        }}>
            {children}
            <SermonMediaCore />
        </MediaContext.Provider>
    );
}

export function useMedia() {
    const context = useContext(MediaContext);
    if (!context) throw new Error('useMedia must be used within a MediaProvider');
    return context;
}
