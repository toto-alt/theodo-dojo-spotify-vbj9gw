import { SavedTrack } from 'spotify-types';

const apiToken =
  'BQAFy0QbLU5Wbqb-GfdLb00F74JgbFjLd1MpENoQFIvtbtyhIKZXz9owTI6qBR04MD8aScrGjrhcelRZc-xNm7sdExexLNN8dYYUfCNPY_bw-LcylsoXJ69z5DXCkl-sIrEb9hik7mxBb8MqshNt2T7XhC_iJZL3ghyDLCVlvOsuj1t_FbuG_LkDhJWWENVUQ9fEunkqN7QcQQmJkLDX_7Aj-A69dsu_ob4DLokhA-2yU4hf22sTLM1tw6KgEZ9SysIpzoVT7JRO0qNtenwSPTXFlUQPg0zGHez49mAWyzED25wIEPLdwnbMgDzz5K4Alnv0nU5KwF4zQYrbmHc1S6krWkz2bg';

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
