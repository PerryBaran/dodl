import React from 'react';
import video from './video/Footage_Final.mp4';
import style from './style/video.module.css';

const Background = (props) => {
    return (
        <div className={style.container}>
            <video className={style.background} autoPlay loop muted>
                <source src={video} type='video/mp4' />
            </video>
      </div>
    );
}

export default Background;