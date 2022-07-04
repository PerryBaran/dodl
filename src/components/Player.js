import React, { useState, useRef, useEffect, useContext } from 'react';
import useSongs from './CustomHooks/useSongs';
import style from './style/player.module.css';
import songList from '../songList'
import { getLocalVolume } from '../services/localStorage';
import Tracklist from './Tracklist';
import Volume from './Volume';
import Controls from './Controls';
import Progressbar from './Progressbar';
import KeyboardListener from './KeyboardListener';
import AppContext from './AppContext';

const Player = (props) => {
    const { isPlaying } = useContext(AppContext);
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
            <Tracklist songs={songs} setSongIndex={setSongIndex}/>
            <Volume volume={volume} setVolume={setVolume} />
            <Controls skipSong={skipSong}/>
            <Progressbar ref={progressRef} audioRef={audioRef}/>
            <KeyboardListener skipSong={skipSong} volume={volume} setVolume={setVolume} />
        </div>
    );
};

export default Player;