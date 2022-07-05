import React, { useContext } from 'react';
import style from './footer.module.css'
import AppContext from '../../utils/context/AppContext';

const Footer = (props) => {
    const { isPlaying } = useContext(AppContext);

    return (
        <footer>
            <a className={`${style.attribution} ${style.left} ${!isPlaying && style.pause}`} 
                href='https://distrokid.com/hyperfollow/jenico/dreaming-of-detuned-love'
                target={'_blank'}
                rel="noreferrer">
                    Music by Jenico
            </a>
            <a className={`${style.attribution} ${style.right} ${!isPlaying && style.pause}`} 
                href='https://www.artstation.com/tommartyn'
                target={'_blank'}
                rel="noreferrer">
                    Art by Tom Martyn
            </a>
        </footer>
    );
}

export default Footer;