import React, { useState, useRef, useEffect } from 'react';
import style from './style/player.module.css';
import { getLocalVolume } from '../services/localStorage';
import Tracklist from './Tracklist';
import Volume from './Volume';
import Controls from './Controls';
import Progressbar from './Progressbar';

const Player = (props) => {
    const {songs, songIndex, setSongIndex, isPlaying, setIsPlaying } = props;
    const audioRef = useRef(null);
    const progressBarRef = useRef(null);

    const [volume, setVolume] = useState(getLocalVolume());
    const [songChange, setSongChange] = useState(false);
    const [duration, setDuration] = useState('0:00');

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying, songIndex]);

    useEffect(() => {
        audioRef.current.volume = volume;
    }, [volume]);

    //checks if a song has just changed > used to add className to the song's name to show it on song change
    useEffect(() => {
        setSongChange(true);
        const timer = setTimeout(() => {
            setSongChange(false);
        }, 1000);
        return () => clearTimeout(timer)
    }, [songIndex]);

    useEffect(() => {
        const skipSongOnCompletion = setInterval(() => {
            const time = audioRef.current.currentTime;
            const duration = audioRef.current.duration;
            if (time === duration) {
                skipSong();
            }
        }, 1000);
        return () => clearInterval(skipSongOnCompletion);
    });

    useEffect(() => {
        window.addEventListener('keydown', keyDownHandler)
        return () => window.removeEventListener('keydown', keyDownHandler)
    });

    const keyDownHandler = (e) => {
        const key = e.code
        if (key === 'Space') {
            e.preventDefault();
            setIsPlaying(!isPlaying)
        } if (key === 'ArrowRight') {
            e.preventDefault();
            skipSong();
        } if (key === 'ArrowLeft') {
            e.preventDefault();
            skipSong(false);
        } if (key === 'ArrowUp' || key === 'Equal' || key === 'NumpadAdd') {
            e.preventDefault();
            const newVolume = volume + 0.01
            if (newVolume < 1) {
                setVolume(newVolume)
            } else {
                setVolume(1);
            }
        } if (key === 'ArrowDown' || key === 'Minus' || key === 'NumpadSubtract') {
            e.preventDefault();
            const newVolume = volume - 0.01
            if (newVolume > 0) {
                setVolume(newVolume)
            } else {
                setVolume(0);
            }
        }
    };
    
    const skipSong = (forwards = true) => {
        if (forwards) {
          setSongIndex(()=> {
              let newSongIndex = songIndex + 1;
              if (newSongIndex > songs.length - 1) {
                newSongIndex = 0;
              }
              return newSongIndex;
          });
        } else {
          setSongIndex(()=> {
            let newSongIndex = songIndex - 1;
            if (newSongIndex < 0) {
              newSongIndex = songs.length - 1
            }
            return newSongIndex;
          });
        }
    };

    //tried to update duration inside Progressbar.js on a useEffect, but found updating here onLoadedMetaData to be more consistent
    const updateProgressBarDuration = () => {
        const seconds = Math.round(audioRef.current.duration)
        if (!isNaN(seconds)) {
            progressBarRef.current.max = seconds
            setDuration(calcDisplayTime(seconds))
        }
    };

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

    return (
        <div className={style.player}>
            <audio ref={audioRef} src={songs[songIndex].src} onLoadedMetadata={updateProgressBarDuration}></audio>
            <div className={`centerFlex positionBottom`}>
                <h2 className={`${style.name} ${isPlaying ?  '' : 'pauseHeading'} ${songChange ? style.nameGlow : ''}`}>{songs[songIndex].title}</h2>
            </div>
            <Tracklist 
                songs={songs} 
                setSongIndex={setSongIndex} 
                isPlaying={isPlaying}
            />
            <Volume 
                volume={volume} 
                setVolume={setVolume} 
                isPlaying={isPlaying}
            />
            <Controls
                skipSong={skipSong}
                isPlaying={isPlaying} 
                setIsPlaying={setIsPlaying} 
            />
            <Progressbar 
                audioRef={audioRef}
                progressBarRef={progressBarRef}
                duration={duration}
                calcDisplayTime={calcDisplayTime}
                isPlaying={isPlaying}
            />
        </div>
    );
};

export default Player;