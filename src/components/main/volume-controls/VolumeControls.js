import React, { useState, useRef, useEffect, useContext } from 'react';
import style from './volumeControls.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh, faVolumeLow, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import { populateStorage } from '../../../services/localStorage';
import AppContext from '../../AppContext';

const VolumeControls = (props) => {
    const { volume, setVolume } = props;
    const { hideWhilePlaying } = useContext(AppContext)

    const [icon, setIcon] = useState(faVolumeHigh);
    const [preVol, setPreVol] = useState(volume);
    const volRef = useRef(undefined);

    useEffect(() => {
        setIcon(()=> {
            if (volume === 0) {
                return faVolumeMute
            }
            if (volume < 0.5) {
                return faVolumeLow
            }
            return faVolumeHigh
        });
        volRef.current.value = volume*100
    }, [volume]);

    const changeVolume = (e) => {
        const currentVolume = e.target.value/100;
        populateStorage('volume', currentVolume); 
        setVolume(currentVolume);
    };

    const muteVolume = () => {
        if (volume > 0) {
            setPreVol(volume);
            setVolume(0);
        } else {
            setVolume(preVol);
        }
    }

    return (
        <div className={style.volume}>
            <div className={`centerFlex ${style.volumeIconContainer}`}>
                <button className={`${style.volumeIcon} ${hideWhilePlaying(style.pause)}`} onClick={() => muteVolume()}>
                    <FontAwesomeIcon icon={icon}/>
                </button>
            </div>
            <input 
                className={style.volumeSlider}
                type='range' 
                name='volume' 
                ref={volRef}
                min={0} 
                max={100} 
                defaultValue={volume * 100} 
                onChange={(e) => changeVolume(e)}
                data-testid="range"
            />
        </div>
    );
};

export default VolumeControls