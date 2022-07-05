import React, { useContext } from 'react';
import AppContext from '../../utils/context/AppContext';
import style from './header.module.css';

const Header = (props) => {
    const { text } = props
    const { hideWhilePlaying } = useContext(AppContext);

    return (
        <header className={`centerFlex ${style.headerContainer}`}>
          <h1 className={`${style.header} ${hideWhilePlaying(style.pause)}`}>{text}</h1>
        </header>
    );
}

export default Header;