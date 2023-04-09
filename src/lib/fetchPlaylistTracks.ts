import { fetchAllTracks } from './fetchTracks';

const PLAYLIST_ID = '3cEYpjA9oz9GiPac4AsH4n';

export const fetchPlaylistTracks = () => {
  return fetchAllTracks(
    `https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks`,
  );
};
