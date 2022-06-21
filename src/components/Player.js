import React, {useState, useRef, useEffect} from 'react';
import style from './style/player.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';

const Player = (props) => {
    const { song, skipSong } = props
    const audioRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => { 
        audioRef.current.volume = 0.2;
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const duration = audioRef.current.duration;
            const time = audioRef.current.currentTime;
            if (time === duration) {
                skipSong();
            }
        }, 1000);
        return () => clearInterval(interval);
      });

    return (
        <div className={style.player}>
            <audio ref={audioRef} src={song.src} ></audio>
            <div className={`${style.centerFlex} ${style.positionBottom}`}>
                <h2 className={style.name}>{song.title}</h2>
            </div>
            <div className={`${style.centerFlex} ${style.positionTop}`}>
                <div className={`${style.controls} ${style.middle}`}>
                    <button className={style.backwards} onClick={() => skipSong(false)}>
                        <FontAwesomeIcon icon={faBackward} />
                    </button>
                    <button className={style.playPause} onClick={() => setIsPlaying(!isPlaying)}>
                        <FontAwesomeIcon icon={ isPlaying ? faPause : faPlay} />
                    </button>
                    <button className={style.forward}>
                        <FontAwesomeIcon icon={faForward} onClick={() => skipSong()}/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Player;