'use client';

import '.././globals.css'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '../../components/Modal/Modal';

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const router = useRouter();

    function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        if (password === 'admin123') {
            localStorage.setItem('admin_auth', 'true');
            router.push('/admin/dashboard');
        } else {
            alert('Senha incorreta');
        }
    }

    return (
        <div className='bg-gradient-to-r from-purple-500 to-pink-500 h-screen flex items-center justify-center'>
            <Modal>
                <h2>Admin Login</h2>
                <form onSubmit={handleLogin} className='flex flex-col gap-4'>
                    <input className='hover:outline-3 hover:outline-purple-600 focus:outline-purple-600 focus:outline-2 focus:outline rounded-sm text-black' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className='hover:text-purple-600 hover:border hover:border-purple-600 hover:border-solid border border-solid  rounded-sm' type="submit">Entrar</button>
                </form>
            </Modal>

        </div>
    );
}
