import React, { useContext } from 'react';
import style from './mediaControls.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';
import AppContext from '../../AppContext';

const MediaControls = (props) => {
    const { isPlaying, setIsPlaying, skipSong } = props
    const { hideWhilePlaying } = useContext(AppContext)

    return (
        <div className={`centerFlex positionTop`}>
                <div className={`${style.controls} ${style.middle}`}>
                    <button className={`${style.control} ${style.backwards} ${hideWhilePlaying(style.pause)}`} onClick={() => skipSong(false)}>
                        <FontAwesomeIcon icon={faBackward} />
                    </button>
                    <button className={`${style.control} ${style.playPause} ${hideWhilePlaying(style.pause)}`} onClick={() => setIsPlaying(!isPlaying)}>
                        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                    </button>
                    <button className={`${style.control} ${style.forward} ${hideWhilePlaying(style.pause)}`}>
                        <FontAwesomeIcon icon={faForward} onClick={() => skipSong()}/>
                    </button>
                </div>
            </div>
    );
};

export default MediaControls