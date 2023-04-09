import { Track } from 'spotify-types';
import AlbumCover from './AlbumCover';

const TrackChoice = ({
  track,
  onClick,
}: {
  track: Track;
  onClick: () => void;
}) => (
  <div className="App-buttons--choice">
    <AlbumCover track={track} />
    <button onClick={onClick}>{track.name}</button>
  </div>
);

export default TrackChoice;
