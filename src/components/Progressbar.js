import React, {useState, useRef, useEffect} from 'react';
import style from './style/progressbar.module.css';

const Progressbar = (props) => {
    const {audioRef} = props
    const barRef = useRef(null);

    const [time, setTime] = useState('0:00');
    const [duration, setDuration] = useState('0:00')

    useEffect(() => {
        const seconds = Math.round(audioRef.current.duration)
        if (!isNaN(seconds)) {
            barRef.current.max = seconds
            setDuration(calcTime(seconds))
        }
    });

    useEffect(() => {
        const updateTimer = setInterval(() => {
            const seconds = Math.round(audioRef.current.currentTime)
            if (!isNaN(seconds)) {
                barRef.current.value = seconds
                setTime(calcTime(seconds))
            }    
        }, 100);
        return () => clearInterval(updateTimer);
    });

    const calcTime = (input) => {
        let sec = input;
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
        <div className={`${style.progress} centerFlex positionBottom`}>
            <p className={style.time}>{time}</p>
            <input 
                className={style.progressBar}
                ref={barRef}
                type='range' 
                name='time'
                min={0}
                defaultValue={0}
                onChange={(e)=> changeHandler(e.target.value)}
            />
            <p className={style.duration}>{duration}</p>
        </div>
    )
}

export default Progressbar