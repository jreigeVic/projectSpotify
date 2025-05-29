import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, name, tracks } = await req.json();

    if (!email || !tracks || !Array.isArray(tracks)) {
      console.error("Dados inválidos:", { email, name, tracks });
      return NextResponse.json({ error: "Dados inválidos!" }, { status: 400 });
    }

    // Verificar se o usuário existe
    let user = await prisma.user.findUnique({
      where: { email: email }, // Verifique se o userId corresponde ao e-mail do usuário
    });

    // Se o usuário não existir, criá-lo
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: email, // Criando usuário com o e-mail como userId
          name: name, // Você pode adicionar mais campos, se necessário
        },
      });
    }

    // Loop para salvar as músicas na base de dados
    for (const track of tracks) {
      const existingTrack = await prisma.track.findUnique({
        where: { spotifyId: track.spotifyId },
      });

      let savedTrack;
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
      // Atualizar o nome do usuário (caso necessário)
      await prisma.user.update({
        where: { id: user.id },
        data: {
          name: name,
        },
      });

      // Relacionar o usuário com a música (upsert)
      await prisma.userTrack.upsert({
        where: { userId_trackId: { userId: user.id, trackId: savedTrack.id } },
        update: {
          // Caso o relacionamento já exista, você pode atualizar os campos necessários.
          // Por exemplo, você pode atualizar o campo "popularity" aqui.
        },
        create: { userId: user.id, trackId: savedTrack.id },
      });
    }

    return NextResponse.json({ message: "Músicas salvas com sucesso!" }, { status: 201 });
  } catch (error) {
    console.error("Erro ao salvar músicas:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
