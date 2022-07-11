import React, { useContext, useEffect, useState } from 'react';
import style from './songName.module.css';
import AppContext from '../../AppContext';
import BeatLoader from "react-spinners/BeatLoader";

const SongName = (props) => {
    const { songs, songIndex } = props
    const { hideWhilePlaying } = useContext(AppContext);
    const [songJustChanged, setSongJustChanged] = useState(false);

    //makes song name visible on song change
    useEffect(() => {
        setSongJustChanged(true);
        const timer = setTimeout(() => {
            setSongJustChanged(false);
        }, 1000);
        return () => clearTimeout(timer)
    }, [songIndex]);

    const addClassOnSongChange = () => {
        return songJustChanged? style.nameGlow : ''
    }

    return (
        <div className={`centerFlex positionBottom`}>
            {songs[songIndex].src?
                <h2 className={`${style.name} ${hideWhilePlaying(style.pause)} ${addClassOnSongChange()}`}>{songs[songIndex].title}</h2>
            :
                <div className={style.loader}>
                    <BeatLoader color={"white"} loading={!songs[songIndex].src} size={25} />
                </div>
            }
            
        </div>
    );
}

export default SongName;