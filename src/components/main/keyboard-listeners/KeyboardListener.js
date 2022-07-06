import { useEffect, useContext } from 'react';
import AppContext from '../../AppContext';

const KeyboardListener = (props) => {
    const { skipSong, volume, setVolume} = props
    const { isPlaying, setIsPlaying } = useContext(AppContext);

    useEffect(() => {
        window.addEventListener('keydown', keyDownHandler)
        return () => window.removeEventListener('keydown', keyDownHandler)
    });

    const keyDownHandler = (e) => {
        const key = e.code
        if (key === 'Space') {
            e.preventDefault();
            setIsPlaying(!isPlaying)
        } if (key === 'ArrowRight') {
            e.preventDefault();
            skipSong();
        } if (key === 'ArrowLeft') {
            e.preventDefault();
            skipSong(false);
        } if (key === 'ArrowUp' || key === 'Equal' || key === 'NumpadAdd') {
            e.preventDefault();
            const newVolume = volume + 0.01
            if (newVolume < 1) {
                setVolume(newVolume)
            } else {
                setVolume(1);
            }
        } if (key === 'ArrowDown' || key === 'Minus' || key === 'NumpadSubtract') {
            e.preventDefault();
            const newVolume = volume - 0.01
            if (newVolume > 0) {
                setVolume(newVolume)
            } else {
                setVolume(0);
            }
        }
    };
}

export default KeyboardListener;