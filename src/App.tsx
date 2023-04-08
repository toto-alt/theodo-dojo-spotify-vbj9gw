import logo from './assets/logo.svg';
import './App.css';
import { useState } from 'react';
import { fetchTracks } from './lib/fetchTracks';
import { useQuery } from '@tanstack/react-query';
import { AlbumCover } from './components';
import swal from 'sweetalert';

const App = () => {
  const { data: tracks, isSuccess } = useQuery({
    queryKey: ['tracks'],
    queryFn: fetchTracks,
  });
  if (!isSuccess) {
    return <div>Oups, something wrong happened</div>;
  }

  const [trackIndex, setTrackIndex] = useState(0);
  const currentTrack = tracks[trackIndex];

  if (currentTrack === undefined) {
    return <div>You don't have any tracks</div>;
  }

  const goToNextTrack = () =>
    setTrackIndex(prevState => (prevState + 1) % tracks.length);

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
  const [firstTrack, secondTrack, thirdTrack] = tracks;

  if (
    firstTrack === undefined ||
    secondTrack === undefined ||
    thirdTrack === undefined
  ) {
    return <div>You don't have any tracks</div>;
  }
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
        <button onClick={goToNextTrack}>Next track</button>
      </div>
      <div className="App-buttons">
        <button onClick={() => checkAnswer(0)}>{firstTrack.track.name}</button>
        <button onClick={() => checkAnswer(1)}>{secondTrack.track.name}</button>
        <button onClick={() => checkAnswer(2)}>{thirdTrack.track.name}</button>
      </div>
    </div>
  );
};

export default App;
