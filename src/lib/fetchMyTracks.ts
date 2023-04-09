import { fetchAllTracks } from './fetchTracks';

export const fetchMyTracks = () => {
  return fetchAllTracks('https://api.spotify.com/v1/me/tracks');
};
