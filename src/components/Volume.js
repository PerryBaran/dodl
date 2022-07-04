import React, { useState, useRef, useEffect } from 'react';
import style from './style/volume.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh, faVolumeLow } from '@fortawesome/free-solid-svg-icons';
import { populateStorage } from '../services/localStorage';

const Volume = (props) => {
    const {volume, setVolume ,isPlaying} = props;

    const [visible, setVisible] = useState(false);
    const [icon, setIcon] = useState(faVolumeHigh);
    const volRef = useRef(null);

    useEffect(() => {
        setIcon(()=> {    
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

    return (
        <div className={style.volume} style={{height: visible ? '270px' : 'auto'}} onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
            <div className={`centerFlex ${style.volumeButtonContainer}`}>
                <button className={`${style.volumeButton} ${isPlaying ?  '' : style.pause}`}>
                    <FontAwesomeIcon icon={icon} />
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
                style={{display: visible ? 'block' : 'none' }}
            />
        </div>
    );
};

export default Volume