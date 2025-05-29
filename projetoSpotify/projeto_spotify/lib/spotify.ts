const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN || " ";

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const GET_TOP_TRACKS = `https://api.spotify.com/v1/me/top/tracks`;
const GET_USER_PROFILE = `https://api.spotify.com/v1/me`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token }),
  });

  return response.json();
};

export async function getTopUserTracks(accessToken: string) {
  const res = await fetch( GET_TOP_TRACKS , {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar os dados do Spotify");
  }

  return res.json();
}


export const getUserProfile = async () => {
  const { access_token } = await getAccessToken();

  return fetch(GET_USER_PROFILE, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
