import React, { useState, useEffect } from 'react';
import Background from './Background';
import Player from './Player'
import style from './style/app.module.css';
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from '../services/firebase';

const App = () => {
  //inconsistent capatilization in song titles because it looks good with the font
  const [songs, setSongs] = useState([
    {
      title: "slumber", 
      src: undefined,
      ref: 'Slumber.flac'
    },
    {
      title: "Your careless embrace",
      src: undefined,
      ref: 'Your Careless Embrace.flac'
    },
    {
      title: "Restless Thoughts",
      src: undefined,
      ref: 'Restless Thoughts.flac'
    },
    {
      title: "Detuned Love",
      src: undefined,
      ref: 'Detuned Love.flac'
    },
    {
      title: "Falling into the Void",
      src: undefined,
      ref: 'Falling into the Void.flac'
    }
  ]);
  const [songIndex, setSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const songsCopy = [...songs];
    const length = songsCopy.length;
    for (let i = 0; i < length; i++) {
      const song = songsCopy[i]
      const songRef = ref(storage, `audio/${song.ref}`);
      getDownloadURL(songRef)
      .then((url) => {
        song.src = url
      })
    }
    setSongs(songsCopy)
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <div className='centerFlex h1Container'>
        <h1 className={isPlaying ?  '' : 'pauseHeading'}>Dreaming of Detuned Love</h1>
      </div>
      <a className={`${style.attribution} ${style.left} ${isPlaying ?  '' : style.pause}`} href='https://distrokid.com/hyperfollow/jenico/dreaming-of-detuned-love'>Music by Jenico</a>
      <a className={`${style.attribution} ${style.right} ${isPlaying ?  '' : style.pause}`} href='https://www.artstation.com/tommartyn'>Art by Tom Martyn</a>
      <Background isPlaying={isPlaying}/>
      <Player 
        songs={songs} 
        songIndex={songIndex} 
        setSongIndex={setSongIndex} 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying}/>
    </div>
  );
};

export default App;
