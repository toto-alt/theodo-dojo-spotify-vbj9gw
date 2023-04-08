import { PlaylistTrack } from 'spotify-types';

const apiToken =
  'BQDZVDPr3VBWSCcwgcSSM15505_SPhCCz8o8gElpbk8jK5EqYhagWKNsOTvpuptUR4rLx21msbwV206TC-Ffz_ZMCd0U6jasDh5hnryysjXT3RWi42e7A2YZ-kxmbUnW09wTTDfuX_lKSi6IWajz87V_rpPqI1mvWn2jbYTHYdxGNXE-abKEKv1Tk9d8eAkSmMzsRpn6mwo540R8DjlL-Zv6odjEWYRGYt2sEFhXRRdirbaHcMT_YhV3ngVHZdAmxw1dGbTzXyLI91JBBzqWBybuiz7X65RPsMx4LsJeqCfCuX6hlKHJIRr72LuaD6X6U_Mj-Y-fkKTSNXSKpNT6SbR70RC6Bw';

export const fetchTracks = async (): Promise<PlaylistTrack[]> => {
  const response = await fetch('https://api.spotify.com/v1/me/tracks', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + apiToken,
    },
  });
  if (!response.ok) {
    throw new Error(`Fetching tracks failed with status ${response.status}`);
  }
  const data = (await response.json()) as { items: PlaylistTrack[] };

  return data.items;
};
