import React from "react";
import logoWhitePath from '../images/logo-white.svg';
import { Link, Route, Routes } from "react-router-dom";

function Header(props) {

  function signOut() {
    props.onSignOut();
  }

  return (
    <header className="header">
      <a href="#" className="header__link">
        <img src={logoWhitePath} className="header__logo" alt="Логотип Место" />
      </a>
      <div className="header__auth">
        <h2 className="header__user-info">{props.userEmailOnHeader}</h2>
        <div className="header__button-container">
          <Routes>
            <Route exact path="/sign-in" element={<Link to="/sign-up" className="header__button button">Регистрация</Link>} />
            <Route exact path="/sign-up" element={<Link to="/sign-in" className="header__button button">Войти</Link>} />
            <Route exact path="/mesto-react" element={<Link to="/sign-in" className="header__button button" onClick={signOut}>Выйти</Link>} />
          </Routes>

        </div>
      </div>
    </header>
  );
}

export default Header;