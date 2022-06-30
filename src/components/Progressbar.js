import React, { useState, useEffect } from 'react';
import style from './style/progressbar.module.css';

const Progressbar = (props) => {
    const {audioRef, progressBarRef, duration, calcDisplayTime} = props

    const [time, setTime] = useState('0:00');

    useEffect(() => {
        const updateTimer = setInterval(() => {
            const seconds = Math.round(audioRef.current.currentTime)
            if (!isNaN(seconds)) {
                progressBarRef.current.value = seconds
                setTime(calcDisplayTime(seconds))
            }    
        }, 100);
        return () => clearInterval(updateTimer);
    });

    const changeHandler = (value) => {
        audioRef.current.currentTime = value;
    };

    return (
        <div className={`${style.progress} centerFlex positionBottom`}>
            <p className={style.time}>{time}</p>
            <input 
                className={style.progressBar}
                ref={progressBarRef}
                type='range' 
                name='time'
                min={0}
                defaultValue={0}
                onChange={(e)=> changeHandler(e.target.value)}
            />
            <p className={style.duration}>{duration}</p>
        </div>
    );
};

export default Progressbar