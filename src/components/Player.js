import React, {useState, useRef, useEffect} from 'react';
import style from './style/player.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faForward, faBackward, faVolumeHigh} from '@fortawesome/free-solid-svg-icons';

const Player = (props) => {
    const {song, skipSong } = props
    const audioRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);

    useEffect(() => { 
        audioRef.current.volume = volume;
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    });

    //has song finished playing? play next song
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
            <Volume setVolume={setVolume}/>
            <Controls skipSong={skipSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
        </div>
    );
};


//play/pause, skip forward/backwards controls
const Controls = (props) => {
    const {skipSong, isPlaying, setIsPlaying} = props

    return (
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
    )
}

const Volume = (props) => {
    const {setVolume} = props;

    const [volumeVisible, setVolumeVisible] = useState(false);

    return (
        <div className={style.volume} onMouseEnter={() => setVolumeVisible(true)} onMouseLeave={() => setVolumeVisible(false)}>
            <button>
                <FontAwesomeIcon icon={faVolumeHigh} />
            </button>
            <input 
                type='range' 
                name='volume' 
                min={0} 
                max={100} 
                defaultValue={50} 
                onChange={(e) => setVolume(e.target.value/100)}
                style={{display: volumeVisible ? 'block' : 'none' }}
            />
        </div>
    )
}

export default Player;