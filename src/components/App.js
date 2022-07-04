import React, { useState } from 'react';
import Background from './Background';
import Player from './Player'
import style from './style/app.module.css';

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="App">
      <div className='centerFlex h1Container'>
        <h1 className={isPlaying ?  '' : 'pauseHeading'}>Dreaming of Detuned Love</h1>
      </div>
      <a className={`${style.attribution} ${style.left} ${isPlaying ?  '' : style.pause}`} href='https://distrokid.com/hyperfollow/jenico/dreaming-of-detuned-love'>Music by Jenico</a>
      <a className={`${style.attribution} ${style.right} ${isPlaying ?  '' : style.pause}`} href='https://www.artstation.com/tommartyn'>Art by Tom Martyn</a>
      <Background isPlaying={isPlaying}/>
      <Player isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
    </div>
  );
};

export default App;
