import logo from './assets/logo.svg';
import './App.css';
import { useState } from 'react';
import { fetchTracks } from './lib/fetchTracks';
import { useQuery } from '@tanstack/react-query';
import { AlbumCover } from './components';
import swal from 'sweetalert';
import { Saved, SavedTrack } from 'spotify-types';
import { shuffleArray } from './lib/shuffleArray';

const getRandomIndex = (maxValue: number) =>
  Math.floor(Math.random() * maxValue);

const getWrongChoicesIndex = (maxValue: number) => {
  if (maxValue < 3) throw new Error('There are less than three songs');

  const choices = new Set<number>();
  while (choices.size < 2) {
    choices.add(getRandomIndex(maxValue));
  }
  return [...choices];
};

const getTrack = (tracks: SavedTrack[], index: number) => {
  const track = tracks[index];
  if (track === undefined) {
    throw new Error(`There is no track for index ${index}`);
  }
  return track;
};

const App = () => {
  const { data: tracks, isSuccess } = useQuery({
    queryKey: ['tracks'],
    queryFn: fetchTracks,
  });
  if (!isSuccess) {
    return <div>Oups, something wrong happened</div>;
  }

  const [trackIndex, setTrackIndex] = useState(getRandomIndex(tracks.length));
  const currentTrack = getTrack(tracks, trackIndex);

  const checkAnswer = (id: number) => {
    const message = `It is ${
      currentTrack.track.name
    } by ${currentTrack.track.artists.map(({ name }) => name).join(' & ')}`;
    if (id === trackIndex) {
      swal('Bravo', message, 'success');
    } else {
      swal('Wrong', message, 'error');
    }
  };

  const possibleTracks = shuffleArray([
    trackIndex,
    ...getWrongChoicesIndex(tracks.length),
  ]).map(index => [getTrack(tracks, index), index] as const);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Bienvenue sur mon blind test</h1>
      </header>
      <div className="App-images">
        <p>You currently have {tracks.length} songs</p>
        <AlbumCover track={currentTrack.track} />
      </div>
      <audio src={currentTrack.track.preview_url} controls autoPlay />
      <div className="App-buttons">
        {possibleTracks.map(([track, index]) => (
          <button onClick={() => checkAnswer(index)}>{track.track.name}</button>
        ))}
      </div>
    </div>
  );
};

export default App;
