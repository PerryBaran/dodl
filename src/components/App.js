import React, { useState } from 'react';
import Background from './background/Background';
import Player from './main/Player';
import Header from './header/Header';
import Footer from './footer/Footer';
import AppContext from './AppContext';

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const hideWhilePlaying = (input) => {
    return isPlaying? '' : input
  }

  return (
    <AppContext.Provider value={{hideWhilePlaying}}>
      <Header/>
      <Background isPlaying={isPlaying}/>
      <Player isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
      <Footer/>
    </AppContext.Provider>
  );
};

export default App;
