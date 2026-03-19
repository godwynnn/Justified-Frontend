import Link from 'next/link';
import SermonGrid from '../components/SermonGrid';
import { MediaProvider } from '../context/MediaContext';
import SermonsContent from '../components/SermonsContent';

async function getSermons() {
    try {
        const res = await fetch('http://127.0.0.1:8000/api/sermons/', { cache: 'no-store' });
        if (!res.ok) return [];
        return await res.json();
    } catch (error) {
        console.error("Failed to fetch sermons:", error);
        return [];
    }
}

export default async function Sermons() {
    const sermons = await getSermons();
    const latestSermon = sermons.length > 0 ? sermons[0] : null;

    return (
        <MediaProvider>
            <SermonsContent sermons={sermons} latestSermon={latestSermon} />
        </MediaProvider>
    );
}
