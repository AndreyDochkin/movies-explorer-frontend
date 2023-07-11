import React from "react";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import logoPath from '../../images/logo.svg';

function Header() {
    return (
        <header className="header">
            <img src={logoPath}  className='header__logo' alt="Логотип" />


            <div className="header__container">

                <Link to="/sign-in" className="header__link">
                    Регистрация
                </Link>

                <button className="header__button" type="button">
                    <Link to="/sign-up" className="header__link">Войти</Link>
                </button>
            </div>
        </header>

    );
}

export default Header;
