import React, { useState } from 'react';
import Background from './Background';
import Player from './Player'

import slumber from './audio/Slumber.flac';
import careless from './audio/Your Careless Embrace.flac';
import restless from './audio/Restless Thoughts.flac';
import detuned from './audio/Detuned Love.flac';
import falling from './audio/Falling into the Void.flac'


const App = () => {
  const [songs, setSongs] = useState([
    {
      title: "Slumber",
      src: slumber
    },
    {
      title: "Your Careless Embrace",
      src: careless
    },
    {
      title: "Restless Thoughts",
      src: restless
    },
    {
      title: "Detuned Love",
      src: detuned
    },
    {
      title: "Falling into the Void",
      src: falling
    }
  ])

  const [songIndex, setSongIndex] = useState(0);

  return (
    <div className="App">
      <Background />
      <Player song={songs[songIndex]} />
    </div>
  );
}

export default App;
