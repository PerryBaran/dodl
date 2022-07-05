import React, { useContext, useEffect, useState } from 'react';
import style from './songName.module.css';
import AppContext from '../../../utils/context/AppContext';

const SongName = (props) => {
    const { songs, songIndex } = props
    const { hideWhilePlaying } = useContext(AppContext);
    const [songChangeClassName, setSongChangeClassName] = useState(false);

    //makes song name visible on song change
    useEffect(() => {
        setSongChangeClassName(true);
        const timer = setTimeout(() => {
            setSongChangeClassName(false);
        }, 1000);
        return () => clearTimeout(timer)
    }, [songIndex]);

    return (
        <div className={`centerFlex positionBottom`}>
            <h2 className={`${style.name} ${hideWhilePlaying(style.pause)} ${songChangeClassName && style.nameGlow}`}>{songs[songIndex].title}</h2>
        </div>
    );
}

export default SongName;