"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      name?: string;
      email?: string;
      image?: string;
    };
  }
}
import { getTopUserTracks } from "../../lib/spotify";
import { Track } from "@prisma/client";

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
  id: string; // Assuming 'id' is the correct property for track identification
  artists: artist[];
  album: album;
};

export default function Modal({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [tracks, setTracks] = useState<UserTopTracks[]>([]);

  const fetchData = useCallback(async () => {
    try {
      if (session?.accessToken) {
        const data: { items: UserTopTracks[] } = await getTopUserTracks(session.accessToken);
        console.log(data.items);

        setTracks(data.items);
      } else {
        console.error("Access token is missing");
      }
    } catch (error) {
      console.error("Erro ao buscar músicas:", error);
    }
  }, [session?.accessToken]);

  useEffect(() => {
    if (session?.accessToken) {
      fetchData();
    }
  }, [fetchData, session?.accessToken]);

  function saveMusic({ email, name, tracks }: { email: string; name: string; tracks: Track[] }) {
    // Verifica se o usuário está logado
    if (!session) {
      signIn("spotify", { callbackUrl: "/api/auth/callback/spotify" });
      return;
    }

    if (email && name && tracks.length > 0) {
      fetch(`/api/music`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, name: name, tracks }),
      })
        .then((res) => res.json())
        .then((data) => console.log('saved tracks', data))
        .catch((error) => console.error("Error:", error));
    }

  }

  useEffect(() => {
    if (tracks.length > 0) {
      try {
        saveMusic({
          email: session?.user?.email,
          name: session?.user?.name,
          tracks: tracks.map((track) => ({
            id: track.id,
            name: track.album.name,
            spotifyId: track.id,
            artist: track.artists.map((artist) => artist.name).join(", "),
            album: track.album.name,
            popularity: 0, // Provide default or actual value
            durationMs: 0, // Provide default or actual value
          })),
        });
      } catch (error) {
        console.error("Error saving tracks:", error);
      }
    }
  });

  return (
    <div className="p-1 mx-auto flex min-h-screen max-w-screen-sm items-center justify-center">
      <div className="rounded-md bg-gradient-to-r from-red-500 via-yellow-500 to-violet-500 p-1">
        <div className="flex flex-col h-full w-full p-10 bg-gray-300 dark:bg-gray-800">
          {children}
          {session && tracks.length > 0 && (
            <div>
              <h2 className="mt-4 text-lg">Suas músicas mais ouvidas:</h2>
              <ul>
                {tracks.map((track, index) => (
                  <li
                    key={index}
                    className="flex flex-row flex-wrap gap-1 mb-1"
                  >
                    <span className="w-10">{index + 1}° -</span>
                    <p className="flex flex-row gap-1 flex-nowrap">
                      {
                        <Image
                          height={25}
                          width={25}
                          src={track.album.images[0].url}
                          alt={track.album.name}
                        />
                      }
                      {track.album.name} -{" "}
                    </p>
                    {track.artists.map((artista) => {
                      return artista.name;
                    })}
                  </li>
                ))}
              </ul>
            </div>
          )
          }
          {session && tracks.length === 0 && (
            <div>
              <p className="text-lg"><span className="text-red-500 font-bold">X</span> Infelizmente não encontramos suas músicas :( </p>
              <p className="text-lg">Faça login com outra conta para ver seu ranking!</p>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
