import { PlaylistTrack, SavedTrack, Track } from 'spotify-types';

export interface TrackResult<T> {
  items: T[];
  next: string | null;
}

const isTrack = (
  track: PlaylistTrack['track'] | SavedTrack['track'],
): track is Track => track !== null && track.type === 'track';

const apiToken =
  'BQAJyQCvJVl5eFRBD2j60UjnMvez8_1XtyCGnLhVAIoBYpwdfUdsP1WD-0u6EvURJYp7ZPuq3zovJDy1PuGl13440zxZC6HdtKu7yA0Us6_MWznalK_Se9ASFHgU-Fv6XotWv6l8h31CddODnLcB2Kop9LEhjz19ymKFPFdl2Sak4Gx4TlpQ8J-vhYH-MABR2tdlDeVf8FiuvTwAs2nJpVwL4Lnj8Uwb1iCt9JpOqa24pUdJf-jJPoan_Yt9nJRGVTXUU9wkpn5T84LQIy9qXGKYLNrKtcPKIlgULQi_qqSzqAn9qYHmawkNM4enla0U7fYuSbX17-N7vMYjk7O4NjYedajrpQ';

const fetchTracks = async <T>(url: string) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + apiToken,
    },
  });
  if (!response.ok) {
    throw new Error(`Fetching tracks failed with status ${response.status}`);
  }
  return (await response.json()) as TrackResult<T>;
};

export const fetchAllTracks = async <T extends PlaylistTrack | SavedTrack>(
  url: string,
) => {
  const result: Track[] = [];

  let data: TrackResult<T> = { items: [], next: url };
  while (data.next !== null) {
    data = await fetchTracks(data.next);
    result.push(
      ...(data.items
        .map(({ track }) => track)
        .filter(track => isTrack(track)) as Track[]),
    );
  }

  return result;
};
