import React, { useRef, useEffect, useContext } from 'react';
import style from './style/video.module.css';
import useVideoSrcFirebase from './CustomHooks/useVideoSrcFirebase';
import AppContext from './AppContext';


const Background = (props) => {
    const { isPlaying } = useContext(AppContext);
    const videoRef = useRef(undefined);
    const [src] = useVideoSrcFirebase('video/Background.mp4')

    useEffect(() => { 
        if (isPlaying) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    });

    return (
        <div className={style.container}>
            <video 
                className={style.background} 
                autoPlay 
                loop 
                muted 
                ref={videoRef} 
                src={src}
            />
      </div>
    );
};


export default Background;