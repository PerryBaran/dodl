import React, { useState, useRef, useEffect } from 'react';
import useSrcArrayFirebase from '../../hooks/useSrcArrayFirebase';
import songInfo from '../songInfo'
import { getLocalVolume } from '../../services/localStorage';
import Tracklist from './tracklist/Tracklist';
import VolumeControls from './volume-controls/VolumeControls';
import MediaControls from './media-controls/MediaControls';
import Progressbar from './progress-bar/ProgressBar';
import KeyboardListener from './keyboard-listeners/KeyboardListener';
import SongName from './song-name/SongName';

const Player = (props) => {
    const { isPlaying, setIsPlaying } = props;
    
    const [songs] = useSrcArrayFirebase(songInfo);
    const [songIndex, setSongIndex] = useState(0);
    const [volume, setVolume] = useState(getLocalVolume());
    
    const audioRef = useRef(undefined);
    const progressRef = useRef(undefined);

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
        <main>
            <audio 
                ref={audioRef} 
                src={songs[songIndex].src} 
                onLoadedMetadata={() => {progressRef.current.updateProgressBarDuration()}}
                onEnded={() => skipSong()}
            />
            <SongName songs={songs} songIndex={songIndex}/>
            <Tracklist songs={songs} setSongIndex={setSongIndex}/>
            <VolumeControls volume={volume} setVolume={setVolume} />
            <MediaControls skipSong={skipSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
            <Progressbar ref={progressRef} audioRef={audioRef}/>
            <KeyboardListener skipSong={skipSong} volume={volume} setVolume={setVolume}/>
        </main>
    );
};

export default Player;