import { fetchAllTracks } from './fetchTracks';

const PLAYLIST_ID = '37i9dQZEVXbMDoHDwVN2tF';

export const fetchPlaylistTracks = () => {
  return fetchAllTracks(
    `https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks`,
  );
};
