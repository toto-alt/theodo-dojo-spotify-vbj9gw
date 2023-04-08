import logo from './assets/logo.svg';
import './App.css';
import { useState } from 'react';
import { fetchTracks } from './lib/fetchTracks';
import { useQuery } from '@tanstack/react-query';
import { AlbumCover } from './components';

const trackUrls = [
  'https://p.scdn.co/mp3-preview/742294f35af9390e799dd96c633788410a332e52',
  'https://p.scdn.co/mp3-preview/5a12483aa3b51331aba663131dbac967ccb33d99',
  'https://p.scdn.co/mp3-preview/31f65b6a613010f22316c7be335b62226cf2f263',
  'https://p.scdn.co/mp3-preview/0f6b8a3524ec410020457da4cdd7717f9addce2f',
  'https://p.scdn.co/mp3-preview/ac28d1b0be285ed3bfd8e9fa5fad133776d7cf36',
];

const App = () => {
  const [trackIndex, setTrackIndex] = useState(0);
  const goToNextTrack = () =>
    setTrackIndex(prevState => (prevState + 1) % trackUrls.length);

  const { data: tracks, isSuccess } = useQuery({
    queryKey: [''],
    queryFn: fetchTracks,
  });
  if (!isSuccess) {
    return <div>Oups, something wrong happened</div>;
  }
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
        <AlbumCover track={firstTrack.track} />
      </div>
      <audio src={firstTrack.track.preview_url} controls autoPlay />
      <div className="App-buttons">
        <button onClick={goToNextTrack}>Next track</button>
      </div>
      <div className="App-buttons">
        <button>{firstTrack.track.name}</button>
        <button>{secondTrack.track.name}</button>
        <button>{thirdTrack.track.name}</button>
      </div>
    </div>
  );
};

export default App;
