import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { userId, tracks } = await req.json();

    if (!userId || !tracks || !Array.isArray(tracks)) {
      return NextResponse.json({ error: "Dados inválidos!" }, { status: 400 });
    }

    // Loop para salvar as músicas na base de dados
    for (const track of tracks) {
      const existingTrack = await prisma.track.findUnique({
        where: { spotifyId: track.spotifyId },
      });

      let savedTrack: { name: string; id: string; spotifyId: string; artist: string; album: string; popularity: number; durationMs: number; };
      if (!existingTrack) {
        savedTrack = await prisma.track.create({
          data: {
            spotifyId: track.spotifyId,
            name: track.name,
            artist: track.artist,
            album: track.album,
            popularity: track.popularity,
            durationMs: track.durationMs,
          },
        });
      } else {
        savedTrack = existingTrack;
      }

      // Relacionar o usuário com a música
      await prisma.userTrack.upsert({
        where: { userId_trackId: { userId: userId, trackId: savedTrack.id } },
        update: {},
        create: { userId, trackId: savedTrack.id },
      });
    }

    return NextResponse.json({ message: "Músicas salvas com sucesso!" }, { status: 201 });
  } catch (error) {
    console.error("Erro ao salvar músicas:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
