import React, { useState, useRef, useEffect, useContext } from 'react';
import style from './volumeControls.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh, faVolumeLow } from '@fortawesome/free-solid-svg-icons';
import { populateStorage } from '../../../services/localStorage';
import AppContext from '../../../utils/context/AppContext';

const VolumeControls = (props) => {
    const { volume, setVolume } = props;
    const { isPlaying } = useContext(AppContext)

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
            <div className={`centerFlex ${style.volumeIconContainer}`}>
                <i className={`${style.volumeIcon} ${!isPlaying && style.pause}`}>
                    <FontAwesomeIcon icon={icon}/>
                </i>
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

export default VolumeControls