import React, { useState} from 'react';
import Background from './Background';
import Player from './Player'
import style from './style/app.module.css';

import slumber from '../media/audio/Slumber.flac';
import careless from '../media/audio/Your Careless Embrace.flac';
import restless from '../media/audio/Restless Thoughts.flac';
import detuned from '../media/audio/Detuned Love.flac';
import falling from '../media/audio/Falling into the Void.flac'


const App = () => {
  //inconsistent capatilization in song titles because it looks good with the font
  const [songs] = useState([
    {
      title: "slumber", 
      src: slumber
    },
    {
      title: "Your careless embrace",
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
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="App">
      <h1 className={isPlaying ?  '' : 'pause'}>Dreaming of Detuned Love</h1>
      <a className={`${style.left} ${isPlaying ?  '' : 'pauseA'}`} href='https://distrokid.com/hyperfollow/jenico/dreaming-of-detuned-love'>Music by Jenico</a>
      <a className={`${style.right} ${isPlaying ?  '' : 'pauseA'}`} href='https://www.artstation.com/tommartyn'>Art by Tom Martyn</a>
      <Background isPlaying={isPlaying}/>
      <Player 
        songs={songs} 
        songIndex={songIndex} 
        setSongIndex={setSongIndex} 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying}/>
    </div>
  );
}

export default App;
