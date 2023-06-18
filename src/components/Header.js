import logo from '../images/logo.svg';
import React from 'react';

function Header () {
    return (
    <header className="header page__header">
      <img src={logo} alt="логотип" className="header__logo" />
    </header>
    )
}

export default Header;
