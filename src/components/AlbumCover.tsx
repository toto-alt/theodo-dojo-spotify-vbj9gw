import { Track } from 'spotify-types';

const AlbumCover = ({ track }: { track: Track }) => {
  return (
    <img src={track.album.images[0]?.url} style={{ width: 400, height: 400 }} />
  );
};

export default AlbumCover;
