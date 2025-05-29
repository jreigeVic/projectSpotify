'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '../../../components/Modal/Modal';

export default function AdminDashboard() {
    const router = useRouter();
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        const isAuth = localStorage.getItem('admin_auth');
        if (!isAuth) {
            router.push('/admin/login');
        }
        fetch('/api/tracks')
            .then((res) => res.json())
            .then((data) => setTracks(data));
    }, [router]);

    return (
        <div>
            <Modal>
                <h2>Painel Admin</h2>
                <h3>Top Músicas</h3>
                <ul>
                    {tracks.map((track: any) => (
                        <li key={track.track_id}>{track.track_id} - {track.play_count} plays</li>
                    ))}
                </ul>
            </Modal>

        </div>
    );
}
