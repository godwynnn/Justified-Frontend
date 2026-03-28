import Link from 'next/link';
import SermonGrid from '../components/SermonGrid';
import SermonsContent from '../components/SermonsContent';

async function getSermons() {
    try {
        const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api';
        const res = await fetch(`${API_BASE}/sermons/`, { cache: 'no-store' });
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
        <SermonsContent sermons={sermons} latestSermon={latestSermon} />
    );
}
