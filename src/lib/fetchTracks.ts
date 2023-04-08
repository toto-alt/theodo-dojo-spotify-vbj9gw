import { SavedTrack } from 'spotify-types';

const apiToken =
  'BQCiWJ4qBnO0mUm2D1eD9KmzOk4v2JQ94qhkT8Ksa3eiT50zTMDR4Q-Mh6Ohs4U1PLTXBjcAP1eVDyxFXwT8DqAClul3Uzc0rocxKekvEgt30RlZb4HMuqFRY84ri5MLxepa-axe7lQRr12aT2CF0-Jzw5DZc7pz2S9cnUqRXYSMTvQKz3NrqihYtajH1q4iBVPx2hu2o0lUpu6d2KthK4F_eGl3pkwbVDwHSX5rDrTAkdbvOQjiimL8mtzQ74in0Yw6FbHcwKsb_IzlhgwZQkF-jpO-MyDGgwEdOrog5h9bTYQW6m3Iub7lxDy-we5YgWHLzOEEdyVaZxixZ42xyFQd--nuNQ';

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
