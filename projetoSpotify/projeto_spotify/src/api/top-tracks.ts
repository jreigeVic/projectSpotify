import { getTopUserTracks } from "../lib/spotify";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const response = await getTopUserTracks();
    console.log(response);
    
    if (response.status === 204 || response.status > 400){
        return console.log("tivemos algum problema no retorno da api, cod:  " + res.status)
    }

    const tracks = await response.json();
    
    if (tracks.item === null){
        return console.log("musicas nao encontradas cod: " + res.status)
    }

    const newTrack = new Array<any>();

    tracks.items.map( (trackItems) => {
        newTrack.push({
            "track": trackItems.name,
            "artists": trackItems.artists.map((_artist) => _artist.name).join(", "),
            "album": trackItems.album.name
        });
    } )

 

    res.setHeader(
        'Cache-Control',
        'public, s-maxage=60, stale-while-revalidate-30'
    )
        console.log(tracks)
    return res.status(200).json(newTrack)

}  