import React, {useState, useRef, useEffect} from 'react';
import style from './style/player.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faForward, faBackward, faVolumeHigh, faVolumeLow, faVolumeOff, faBars} from '@fortawesome/free-solid-svg-icons';
import { getLocalStorage, populateStorage } from './localStorage';

const Player = (props) => {
    const {songs, songIndex, setSongIndex, skipSong, isPlaying, setIsPlaying } = props;
    const audioRef = useRef(null);

    const [volume, setVolume] = useState(Number(getLocalStorage('volume')));

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
            <audio ref={audioRef} src={songs[songIndex].src} ></audio>
            <div className={`${style.centerFlex} ${style.positionBottom}`}>
                <h2 className={style.name}>{songs[songIndex].title}</h2>
            </div>
            <Tracklist songs={songs} setSongIndex={setSongIndex} />
            <Volume volume={volume} setVolume={setVolume}/>
            <Controls skipSong={skipSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
        </div>
    );
};

const Tracklist = (props) => {
    const {songs, setSongIndex} = props;

    const [visible, setVisible] = useState(false);

    return (
        <div className={style.tracklist} onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
            <button>
                <FontAwesomeIcon icon={faBars} />
            </button>
            <ul style={{display: visible ? 'block' : 'none' }}>
                {songs.map((song => {
                    const index = songs.indexOf(song)
                    return (
                        <li key={song.title} onClick={() => setSongIndex(index)}>{song.title}</li>
                    )
                }))}
            </ul>
        </div>
    )
}

const Volume = (props) => {
    const {volume, setVolume} = props;

    const [visible, setVisible] = useState(false);
    const [icon, setIcon] = useState(faVolumeHigh);

    useEffect(() => {
        setIcon(()=> {    
            if (volume < 0.5) {
                return faVolumeLow
            }
            if (volume === 0) {
                return faVolumeOff
            }
            return faVolumeHigh
        });
    }, [volume]);

    //remembers volume value upon reloads
    const changeVolume = (e) => {
        const currentVolume = e.target.value/100;
        populateStorage('volume', currentVolume); 
        setVolume(currentVolume);
    }

    return (
        <div className={style.volume} style={{height: visible ? '270px' : 'auto'}} onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
            <div className={`${style.centerFlex} ${style.volumeButton}`}>
                <button>
                    <FontAwesomeIcon icon={icon} />
                </button>
            </div>
            <input 
                type='range' 
                name='volume' 
                min={0} 
                max={100} 
                defaultValue={volume * 100} 
                onChange={(e) => changeVolume(e)}
                style={{display: visible ? 'block' : 'none' }}
            />
        </div>
    )
}

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

export default Player;