
import {useEffect, useState} from 'react';
import Modal from './components/Modal/Modal';
import React from 'react';

export default function Home() {  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-fixed bg-gradient-to-tl from-green-400 to-blue-500" >
      <Modal />
      <button>Buscar top tracks da Lorde</button>
    </main>
  )
}