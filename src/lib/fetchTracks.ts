import { SavedTrack } from 'spotify-types';

const apiToken =
  'BQBXNJtJbuwQDLyur8Z4u_NS74-i6hjKktyD_3h8bJs9PhLcM6bvT8uxpD_b47N1MDpk_5hQQN33JfKjOUdY67sN2UhpHwIQqkr7MbZ6alVNVcfEIIicUmlbdL7EtRWd2kYBmr3cCmhPBagBDyXhxieyB7UMY6EQpgdn3lXQTxMxiOeCS8d1GTYfO78ItE9WVcatrM2BTY7jNeYBARJJU27IXYvwXyhUf8eJp77WgSry9mYDqQnBxlhszMXBT08ytiWIfVhO3JOwFxT729YtfjWsRP2J1OJdu4rGEUCDSYPpb7eLWx_AiIyxtVgtaXfYHHk7s9LRQfhCQTXXPnWVXAeoDcZPmg';

export const fetchTracks = async (): Promise<SavedTrack[]> => {
  const response = await fetch('https://api.spotify.com/v1/me/tracks', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + apiToken,
    },
  });
  if (!response.ok) {
    throw new Error(`Fetching tracks failed with status ${response.status}`);
  }
  const data = (await response.json()) as { items: SavedTrack[] };

  return data.items;
};
