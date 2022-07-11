import React, { useRef, useEffect } from 'react';
import style from './background.module.css';
import useSrcFirebase from '../../hooks/useSrcFirebase';
import CircleLoader from "react-spinners/PuffLoader";


const Background = (props) => {
    const { isPlaying } = props;
    const [src] = useSrcFirebase('video/Background.mp4');
    const videoRef = useRef(undefined);

    useEffect(() => {
        if (src) {
            if (isPlaying) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        } 
    }, [isPlaying, src]);

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
            <div className='centerFlex positionTop'>
                <CircleLoader
                    color={"#df88cb"} 
                    loading={!src}
                    size={400}
                />
            </div>  
      </div>
    );
};


export default Background;