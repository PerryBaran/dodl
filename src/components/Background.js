import React, {useRef, useEffect} from 'react';
import video from '../media/video/Footage_Final.mp4';
import style from './style/video.module.css';

const Background = (props) => {
    const {isPlaying} = props;
    const videoRef = useRef(null);

    useEffect(() => { 
        if (isPlaying) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    });

    return (
        <div className={style.container}>
            <video className={style.background} autoPlay loop muted ref={videoRef}>
                <source src={video} type='video/mp4' />
            </video>
      </div>
    );
}

export default Background;