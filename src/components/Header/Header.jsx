import React from "react";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import logoPath from '../../images/logo.svg';
import Navigation from "../Navigation/Navigation";

function Header() {
    return (
        <header className="header">
            <img src={logoPath} className='header__logo' alt="Логотип" />
            <div className="header__container">

                <Link to="/sign-up" className="header__button header__button_signup">
                    Регистрация
                </Link>
                <Link to="/sign-in" className="header__button header__button_signin">
                    Войти
                </Link>

            </div>
            {/* <Navigation /> */}
        </header>

    );
}

export default Header;
