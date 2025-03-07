import { getTopUserTracks } from "../../lib/spotify";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const response = await getTopUserTracks();
    console.log(response);
    
    // if (response === 204 || response > 400){
    //     return console.log("tivemos algum problema no retorno da api, cod:  " + res.status)
    // }

    // const tracks = await response.json();
    
    // if (tracks.item === null){
    //     return console.log("musicas nao encontradas cod: " + res.status)
    // }

    // const newTrack = new Array<any>();

    // tracks.items.map( (trackItems: { name: any; artists: any[]; album: { name: any; }; }) => {
    //     newTrack.push({
    //         "track": trackItems.name,
    //         "artists": trackItems.artists.map((_artist: { name: any; }) => _artist.name).join(", "),
    //         "album": trackItems.album.name
    //     });
    // } )

    //     console.log(tracks)
    // return newTrack[0]

}  