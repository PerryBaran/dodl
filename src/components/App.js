import React from "react";
import video from './video/Footage_Final.mp4';
import background from './images/Final_Render.png';

import videoStyle from './style/video.module.css';

function App() {
  return (
    <div className="App">
      <div className={videoStyle.container}>
        <video className={videoStyle.background} autoPlay loop muted>
          <source src={video} type='video/mp4' />
        </video>
      </div>
      
    </div>
  );
}

export default App;
