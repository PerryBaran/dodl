import React, { useRef, useEffect } from 'react';
import style from './style/video.module.css';
import useVideoSrc from './CustomHooks/useVideoSrc';


const Background = (props) => {
    const { isPlaying } = props;
    const videoRef = useRef(undefined);
    const [src] = useVideoSrc('video/Background.mp4')

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