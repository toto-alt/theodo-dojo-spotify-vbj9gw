import logo from './assets/logo.svg';
import './App.css';
import { useState } from 'react';
import { fetchTracks } from './lib/fetchTracks';
import { useQuery } from '@tanstack/react-query';
import { AlbumCover } from './components';
import swal from 'sweetalert';
import { SavedTrack } from 'spotify-types';
import { shuffleArray } from './lib/shuffleArray';

const getRandomIndex = (maxValue: number) =>
  Math.floor(Math.random() * maxValue);

const getChoicesIndex = (correctIndex: number, maxValue: number) => {
  if (maxValue < 3) throw new Error('There are less than three songs');

  const choices = new Set([correctIndex]);
  while (choices.size < 3) {
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

  const [currentTrackIndex, setCurrentTrackIndex] = useState(
    getRandomIndex(tracks.length),
  );
  const currentTrack = getTrack(tracks, currentTrackIndex);

  const changeSong = () =>
    setCurrentTrackIndex(prevState => {
      if (tracks.length < 2) throw new Error('There are not enough songs');
      let nextState = prevState;
      while (nextState === prevState) {
        nextState = getRandomIndex(tracks.length);
      }
      return nextState;
    });

  const checkAnswer = (id: number) => {
    const pickedTrack = getTrack(tracks, id);

    const message = `It is ${
      pickedTrack.track.name
    } by ${pickedTrack.track.artists.map(({ name }) => name).join(' & ')}`;
    if (id === currentTrackIndex) {
      const message = `It is ${
        pickedTrack.track.name
      } by ${pickedTrack.track.artists.map(({ name }) => name).join(' & ')}`;
      swal('Bravo', message, 'success').then(changeSong);
    } else {
      const message = `It is not ${
        pickedTrack.track.name
      } by ${pickedTrack.track.artists.map(({ name }) => name).join(' & ')}`;
      swal('Wrong', message, 'error');
    }
  };

  const possibleTracks = shuffleArray(
    getChoicesIndex(currentTrackIndex, tracks.length),
  ).map(index => [getTrack(tracks, index), index] as const);

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
        <button onClick={changeSong}>Change song</button>
      </div>
      <div className="App-buttons">
        {possibleTracks.map(([track, index]) => (
          <button onClick={() => checkAnswer(index)}>{track.track.name}</button>
        ))}
      </div>
    </div>
  );
};

export default App;
