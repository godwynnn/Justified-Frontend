'use client';

import React, { useRef, useEffect } from 'react';
import { useMedia } from '../context/MediaContext';

export default function SermonMediaCore() {
    const { activeSermon, isPlaying, setIsPlaying, isMinimized, stop } = useMedia();
    const audioRef = useRef<HTMLAudioElement>(null);

    const hasAudio = !!activeSermon?.audio_url && activeSermon.audio_url.trim() !== '';
    const hasVideo = !!activeSermon?.video_url && activeSermon.video_url.trim() !== '';

    // Sync audio state
    useEffect(() => {
        if (!audioRef.current || !hasAudio || !activeSermon) return;
        
        const audio = audioRef.current;
        // Only drive the core audio if we're minimized (background)
        // or if there is no video at all (to avoid double audio if the modal is open)
        const shouldPlay = isPlaying && (isMinimized || !hasVideo);

        if (shouldPlay && audio.paused) {
            audio.play().catch(console.error);
        } else if (!shouldPlay && !audio.paused) {
            audio.pause();
        }
    }, [isPlaying, isMinimized, hasAudio, hasVideo, activeSermon]);

    // For simplicity in this iteration, we focus on Audio persistence.
    // YouTube videos (iframes) reset if moved in the DOM.
    // So we'll render the media in a persistent layer.

    if (!activeSermon) return null;

    return (
        <div className="sr-only pointer-events-none">
            {hasAudio && (
                <audio
                    ref={audioRef}
                    src={activeSermon.audio_url}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => stop()}
                    preload="auto"
                />
            )}
            {/* If it's a video/YouTube, we'll keep the actual iframe in the Modal for now,
                but for background "playing", audio is the primary concern.
                If they minimize a video, it might stop unless we keep the iframe mounted.
            */}
        </div>
    );
}
