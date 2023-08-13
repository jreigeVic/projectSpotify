
"use client";
import { useEffect, useState } from 'react';
import React from 'react';


type UserTopTracks = [{
    track: string,
    artists: string,
    album: string
}]


export default function Modal() {
    //   const [song, setSong] = useState<UserTopTracks>();

    useEffect(() => {
        async function getData() {
            const response = await fetch('/api/top-tracks');
            const userTopTracks = await response.json();
            console.log(response);
    
            console.log(userTopTracks);
    
        };
        getData();
    }, [])

    return (
        <div className="mx-auto flex min-h-screen max-w-screen-sm items-center  justify-center ">
            <div className="rounded-md bg-gradient-to-r from-red-500 via-yellow-500 ye to-violet-500 p-1">
                <div className='flex flex-col h-full w-full p-10  bg-gray-300 dark:bg-gray-800 back'>
                    <img src="logo_vhs_preto.png" className='m-1 w-20' />
                    <h1 className='m-2'>Compartilhe sua playlist com a gente!</h1>
                    <p className='my-2'>Lorem Ipsum is simply dummy text of the printing and typesetting</p>
                    <div>
                        <input className='mr-2' type='checkbox' placeholder='termos de uso *' />
                        <label>termos de uso  *</label>
                    </div>
                    <button className='mt-6 rounded-md flex flex-row bg-green-600 hover:bg-green-500 '>
                        <img src='PngItem_263635.png' className='w-10 my-2 mx-4 ' /> <p className='m-auto'>conecte-se</p>
                    </button>
                </div>
            </div>
        </div>
    )
}
