import React from 'react';
import style from './mediaControls.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';

const MediaControls = (props) => {
    const { isPlaying, setIsPlaying, skipSong } = props

    const hideWhilePlaying = () => {
        return isPlaying ? style.hideButton : style.showButton;
    };

    return (
        <div className={`centerFlex positionTop`}>
                <div className={`${style.controls} ${style.middle}`}>
                    <button className={`${style.backwards} ${hideWhilePlaying()}`} onClick={() => skipSong(false)}>
                        <FontAwesomeIcon icon={faBackward} />
                    </button>
                    <button className={`${style.playPause} ${hideWhilePlaying()}`} onClick={() => setIsPlaying(!isPlaying)}>
                        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                    </button>
                    <button className={`${style.forward} ${hideWhilePlaying()}`}>
                        <FontAwesomeIcon icon={faForward} onClick={() => skipSong()}/>
                    </button>
                </div>
            </div>
    );
};

export default MediaControls