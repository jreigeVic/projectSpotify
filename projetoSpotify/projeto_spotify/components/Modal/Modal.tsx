// "use client";

// import { useEffect, useState } from "react";
// import React from "react";
// import { getTopUserTracks } from "../../lib/spotify";

// type UserTopTracks = {
//   track: string;
//   artists: string;
//   album: string;
// };

// export default function Modal({ children }: { children: React.ReactNode }) {
//     const [song, setSong] = useState<UserTopTracks>();

//   useEffect(() => {
//     console.log('Arrived at useEffect modal');

//       async function getData() {
//           const response = await getTopUserTracks()
//           const decodedData = atob(response);

//           const userTopTracks = JSON.parse(decodedData)
//           console.log('RESPONSE INSIDE MODAL:  ',  userTopTracks);

//           console.log(userTopTracks.items);

//       };
//       getData();
//   }, [])

//   // useEffect(() => {
//   //   const getData = async () => {
//   //     const response = (await getTopUserTracks());

//   //     console.log(response);

//   //   };
//   //   getData()
//   // }),[];

//   return (
//     <div className="p-1 mx-auto flex min-h-screen max-w-screen-sm items-center  justify-center ">
//       <div className="rounded-md bg-gradient-to-r from-red-500 via-yellow-500 ye to-violet-500 p-1">
//         <div className="flex flex-col h-full w-full p-10  bg-gray-300 dark:bg-gray-800 back">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }
// function useActionState(
//   getTopUserTracks: () => Promise<any>,
//   arg1: null
// ): [any, any] {
//   throw new Error("Function not implemented.");
// }
"use client";

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}
import { getTopUserTracks } from "../../lib/spotify";

type artist = {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

type album = {
  album_type: string;
  artists: artist[];
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
};

type UserTopTracks = {
  track: string;
  artists: artist[];
  album: album;
};

export default function Modal({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [tracks, setTracks] = useState<UserTopTracks[]>([]);

  useEffect(() => {
    if (session?.accessToken) {
      fetchData();
    }
  }, [session]);

  async function fetchData() {
    try {
      if (session?.accessToken) {
        const data = await getTopUserTracks(session.accessToken);
        console.log(data.items);

        setTracks(data.items);
        setTracks(data.items);
      } else {
        console.error("Access token is missing");
      }
    } catch (error) {
      console.error("Erro ao buscar músicas:", error);
    }
  }

  return (
    <div className="p-1 mx-auto flex min-h-screen max-w-screen-sm items-center justify-center">
      <div className="rounded-md bg-gradient-to-r from-red-500 via-yellow-500 to-violet-500 p-1">
        <div className="flex flex-col h-full w-full p-10 bg-gray-300 dark:bg-gray-800">
          {children}
          {session && (
            <div>
              <h2 className="mt-4 text-lg">Suas músicas mais ouvidas:</h2>
              <ul>
                {tracks.map((track, index) => (
                  <li key={index} className="flex flex-row flex-wrap gap-1 mb-1">
                    <span className="w-10">{index + 1}° -</span>
                    <p className="flex flex-row gap-1 flex-nowrap">
                      {
                        <img
                          height={25}
                          width={25}
                          src={track.album.images[0].url}
                          alt={track.album.name}
                        />
                      }
                      {track.album.name} - {" "}
                    </p>
                    {track.artists.map((artista) => {
                      return artista.name;
                    })}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
