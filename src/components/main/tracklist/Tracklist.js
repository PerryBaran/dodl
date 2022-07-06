import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import style from './tracklist.module.css'
import AppContext from '../../AppContext';

const Tracklist = (props) => {
    const { songs, setSongIndex } = props;
    const { hideWhilePlaying } = useContext(AppContext);
    const [visible, setVisible] = useState(false);

    return (
        <div className={style.tracklistContainer} onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
            <i className={`${style.tracklistButton} ${hideWhilePlaying(style.pause)}`} data-testid='icon'>
                <FontAwesomeIcon icon={faBars} />
            </i>
            <ul style={{display: visible ? 'block' : 'none' }}>
                {songs.map((song => {
                    const index = songs.indexOf(song)
                    return (
                        <li key={song.title}>
                            <button onClick={() => setSongIndex(index)}>{song.title}</button>
                        </li>
                    )
                }))}
            </ul>
        </div>
    );
};

export default Tracklist