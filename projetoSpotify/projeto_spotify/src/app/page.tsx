import Modal from './components/Modal/Modal'
import React from 'react'
import $ from 'jquery';


export default function Home() {
  const parametros = getHashParams();
  const token = parametros.access_token;
  
  const getTopUserTrack = () => {
    $.ajax({
      method: "GET",
      dataType: "Json",
      url: "https://api.spotify.com/v1/artists/163tK9Wjr9P9DmM0AVK7lm/top-tracks?country=BR",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
((dados: { tracks: { name: any; }[]; }) => {
    console.log(dados.tracks[0].name)
    })
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-fixed bg-gradient-to-tl from-green-400 to-blue-500" >
     <Modal />
     <button onClick={getTopUserTrack}>Buscar top tracks da Lorde</button>
    </main>
  )
}

 
function getHashParams(): { [key: string]: string } {
  const hashParams: { [key: string]: string } = {};
  const regex = /([^&;=]+)=?([^&;]*)/g;
  const queryString = window.location.hash.substring(1);

  let match;
  while ((match = regex.exec(queryString))) {
    const key = decodeURIComponent(match[1]);
    const value = decodeURIComponent(match[2]);
    hashParams[key] = value;
  }

  return hashParams;
}
