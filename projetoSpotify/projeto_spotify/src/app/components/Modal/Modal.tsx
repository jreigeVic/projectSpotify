
"use client";
import { useEffect, useState } from 'react';
import React from 'react';
import Button from './Button/page';
import Text from "./Text/page";


type UserTopTracks = [{
    track: string,
    artists: string,
    album: string
}]


export default function Modal({
    children
  }: {
    children: React.ReactNode
  }) {
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
                {children}
                </div>
            </div>
        </div>
    )
}
