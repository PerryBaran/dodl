import React, { useState } from 'react';
import Background from './background/Background';
import Player from './main/Player';
import Header from './header/Header';
import Footer from './footer/Footer';
import AppContext from '../utils/context/AppContext';

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const hideWhilePlaying = (input) => {
    if (!isPlaying) {
      return input
    }
    return ''
  }

  return (
    <AppContext.Provider value={{hideWhilePlaying}}>
      <Header text={'Dreaming of Detuned Love'}/>
      <Background isPlaying={isPlaying}/>
      <Player isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
      <Footer/>
    </AppContext.Provider>
  );
};

export default App;
