import React, { useRef, useEffect, useState } from 'react';
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from '../services/firebase';
import style from './style/video.module.css';


const Background = (props) => {
    const {isPlaying} = props;
    const videoRef = useRef(undefined);
    const [src, setSrc] = useState(undefined)

    useEffect(() => { 
        if (isPlaying) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    });

    useEffect(() => {
        if (!src) {
            const backgroundRef = ref(storage, 'video/Background.mp4');
            getDownloadURL(backgroundRef)
            .then((url) => {
                setSrc(url)
            })
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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