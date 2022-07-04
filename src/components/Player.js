import React, { useState, useRef, useEffect } from 'react';
import style from './style/player.module.css';
import { getLocalVolume } from '../services/localStorage';
import Tracklist from './Tracklist';
import Volume from './Volume';
import Controls from './Controls';
import Progressbar from './Progressbar';
import songList from '../songList'
import useSongs from './CustomHooks/useSongs';

const Player = (props) => {
    const { isPlaying, setIsPlaying } = props;
    const audioRef = useRef(undefined);
    const progressRef = useRef(undefined);
    const [songs] = useSongs(songList);
    const [songIndex, setSongIndex] = useState(0);
    const [volume, setVolume] = useState(getLocalVolume());
    const [songChangeClassName, setSongChangeClassName] = useState(false);

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

    //makes song name visible on song change
    useEffect(() => {
        setSongChangeClassName(true);
        const timer = setTimeout(() => {
            setSongChangeClassName(false);
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

    return (
        <div className={style.player}>
            <audio ref={audioRef} src={songs[songIndex].src} onLoadedMetadata={() => {progressRef.current.updateProgressBarDuration()}}></audio>
            <div className={`centerFlex positionBottom`}>
                <h2 className={`${style.name} ${isPlaying ?  '' : 'pauseHeading'} ${songChangeClassName ? style.nameGlow : ''}`}>{songs[songIndex].title}</h2>
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
                ref={progressRef}
                audioRef={audioRef}
                isPlaying={isPlaying}
            />
        </div>
    );
};

export default Player;