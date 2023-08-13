import { getTopUserTracks } from "@/lib/spotify";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const response = await getTopUserTracks();

    // if (response.status === 204 || response.status > 400){
    //     return res.status(200).json({ isPlaying: false });
    // }

    const tracks = await response.json();

    // if (tracks.item === null){
    //     return res.status(200).json({ isPlaying: false });
    // }

    const newTrack = new Array<Object>();

    tracks.items.map( (trackItems) => {
        newTrack.push({
            "track": trackItems.name,
            "artists": trackItems.artists.map((_artist) => _artist.name).join(", "),
            "album": trackItems.album.name
        });
    } )

    // res.setHeader(
    //     'Cache-Control',
    //     'public, s-maxage=60, stale-while-revalidate-30'
    //   );
   
        console.log({newTrack})
       
    return {newTrack}

}  