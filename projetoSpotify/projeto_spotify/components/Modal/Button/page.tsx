"use client";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Button() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Carregando...</p>; // Evita chamar signIn enquanto carrega
  }

  return (
    <section>
      {session ? (
        <button
          onClick={() => signOut()}
          className="mx-auto mt-6 w-max rounded-md flex flex-row bg-red-600 hover:bg-red-500 p-2 text-white"
        >
          Sair
        </button>
      ) : (
        <button
          onClick={() => signIn("spotify", { callbackUrl: "/" })} // Apenas chama signIn quando clicar
          className="mx-auto mt-6 items-center w-max rounded-md flex flex-row bg-green-600 hover:bg-green-500 p-2 text-white"
        >
          <Image
            src="/PngItem_263635.png"
            width={20}
            height={20}
            className="w-10 my-2 mx-4"
            alt="spotify logo"
          />
          Conectar com Spotify
        </button>
      )}
    </section>
  );
}
