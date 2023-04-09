import { SavedTrack } from 'spotify-types';

export interface TrackResult {
  items: SavedTrack[];
  next: string | null;
}

const apiToken =
  'BQDrz0rqLx2cXcDlWPAWQASxP0DIIMuxEyE-iKCgXIDpSUAMKEdvDeWV8ri47D5cmoe2Bfnvzd3izQw3Ws2_IRCXlTSsEpquIXyZpePzei9NbHggtYfhmXOHfAJLCoS_9wa0TRYKGd9ZPT6cqnslvoX9kNJoG2cv10dmkg--j0qmv0bSh9XEnfBKZYjDNZHDdvx_xVahsLn0lorFxz9E7sXa5iazhy5sybwBcU3bLvZxUFR8O5Y65nh_WbbxLgYihlyvAJdYsa5l0vfsnxrEroA2mq69UqYdpNiOx-0gfbUpWfLsBwG_sd1-qwiHdMnkwabxWDiStvwV7PKjs3g-hs-ppufKFg';

const fetchTracks = async (url: string) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + apiToken,
    },
  });
  if (!response.ok) {
    throw new Error(`Fetching tracks failed with status ${response.status}`);
  }
  return (await response.json()) as TrackResult;
};

export const fetchAllTracks = async (url: string) => {
  const result: SavedTrack[] = [];

  let data: TrackResult = { items: [], next: url };
  while (data.next !== null) {
    data = await fetchTracks(data.next);
    result.push(...data.items);
  }
  return result;
};
