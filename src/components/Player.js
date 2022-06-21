import React from 'react';
import style from './style/player.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';

const Player = (props) => {
    const { song } = props

    return (
        <div className={`${style.bottom} ${style.center}`}>
            <div className={style.player}>
                <audio></audio>
                <h3 className={style.name}>{song.title}</h3>
                <div className={style.center}>
                    <div className={style.controls}>
                    <button>
                        <FontAwesomeIcon icon={faBackward} />
                    </button>
                    <button>
                        <FontAwesomeIcon icon={faPlay} />
                    </button>
                    <button>
                        <FontAwesomeIcon icon={faForward} />
                    </button>
                </div>
                </div>
                
            </div>
        </div>
    );
}

export default Player;