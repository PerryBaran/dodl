import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef, useContext } from 'react';
import style from './progressBar.module.css';
import AppContext from '../../../utils/context/AppContext';

const Progressbar = forwardRef((props, ref) => {
    const { audioRef } = props
    const { hideWhilePlaying } = useContext(AppContext);

    const progressBarRef = useRef(undefined);
    const [duration, setDuration] = useState('0:00');
    const [time, setTime] = useState('0:00');

    useImperativeHandle(ref, () => ({
        updateProgressBarDuration() {
            const seconds = Math.round(audioRef.current.duration)
            if (!isNaN(seconds)) {
                progressBarRef.current.max = seconds
                setDuration(calcDisplayTime(seconds))
            }
        }
    }));

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
    
    const calcDisplayTime = (seconds) => {
        let sec = seconds;
        let min = 0;
        while (sec >= 60) {
            min++;
            sec = sec - 60;
        }
        if (sec < 10) {
            sec = `0${sec}`;
        }
        return `${min}:${sec}`;
    };

    const changeHandler = (value) => {
        audioRef.current.currentTime = value;
    };

    return (
        <div className={`${style.progress} centerFlex positionBottom `}>
            <p className={`${style.displayTime} ${style.time} ${hideWhilePlaying(style.pause)}`}>{time}</p>
            <input 
                className={`${style.progressBar} ${hideWhilePlaying(style.pause)}`}
                ref={progressBarRef}
                type='range' 
                name='time'
                min={0}
                defaultValue={0}
                onChange={(e)=> changeHandler(e.target.value)}
            />
            <p className={`${style.displayTime} ${style.duration} ${hideWhilePlaying(style.pause)}`}>{duration}</p>
        </div>
    );
});

export default Progressbar