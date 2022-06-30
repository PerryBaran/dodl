import React, { useState, useEffect } from 'react';
import Background from './Background';
import Player from './Player'
import style from './style/app.module.css';
import { getDownloadURL } from "firebase/storage";
import { slumberRef, carelessRef, restlessRef, detunedRef, fallingRef } from '../services/firebase';

const App = () => {
  //inconsistent capatilization in song titles because it looks good with the font
  const [songs, setSongs] = useState([
    {
      title: "slumber", 
      src: undefined
    },
    {
      title: "Your careless embrace",
      src: undefined
    },
    {
      title: "Restless Thoughts",
      src: undefined
    },
    {
      title: "Detuned Love",
      src: undefined
    },
    {
      title: "Falling into the Void",
      src: undefined
    }
  ]);
  const [songIndex, setSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
      getDownloadURL(slumberRef)
      .then((url) => {
        updateSongSrc(0, url)
      })
      getDownloadURL(carelessRef)
      .then((url) => {
        updateSongSrc(1, url)
      })
      getDownloadURL(restlessRef)
      .then((url) => {
        updateSongSrc(2, url)
      })
      getDownloadURL(detunedRef)
      .then((url) => {
        updateSongSrc(3, url)
      })
      getDownloadURL(fallingRef)
      .then((url) => {
        updateSongSrc(4, url)
      })
  }, []);

  const updateSongSrc = (i, url) => {
    const newSongs = songs;
    newSongs[i].src = url;
    setSongs(newSongs);
  }

  return (
    <div className="App">
      <h1 className={isPlaying ?  '' : 'pauseHeading'}>Dreaming of Detuned Love</h1>
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
