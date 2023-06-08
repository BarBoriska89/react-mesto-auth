import React from "react";
import logoWhitePath from '../images/logo-white.svg';

function Header() {
    return (
        <header className="header">
        <a href="#" className="header__link">
          <img src={logoWhitePath} className="header__logo" alt="Логотип Место" />
        </a>
      </header>
    );
}

export default Header;