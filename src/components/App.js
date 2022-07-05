import React, { useState } from 'react';
import Background from './background/Background';
import Player from './main/Player';
import Header from './header/Header';
import Footer from './footer/Footer';
import AppContext from '../utils/context/AppContext';

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <AppContext.Provider value={{isPlaying, setIsPlaying}}>
      <Header text={'Dreaming of Detuned Love'}/>
      <Background/>
      <Player/>
      <Footer/>
    </AppContext.Provider>
  );
};

export default App;
