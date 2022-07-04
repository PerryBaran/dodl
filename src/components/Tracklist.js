import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import style from './style/tracklist.module.css'
import AppContext from './AppContext';

const Tracklist = (props) => {
    const { songs, setSongIndex } = props;
    const { isPlaying } = useContext(AppContext);
    const [visible, setVisible] = useState(false);

    return (
        <div className={style.tracklistContainer} onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
            <button className={`${style.tracklistButton} ${isPlaying ?  '' : style.pause}`}>
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
    );
};

export default Tracklist