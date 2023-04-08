import { CSSProperties } from 'react';
import { Track } from 'spotify-types';

const AlbumCover = ({
  track,
  width,
  height,
}: {
  track: Track;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
}) => {
  return <img src={track.album.images[0]?.url} style={{ width, height }} />;
};

export default AlbumCover;
