import React from "react";
import { Link, NavLink, Route, Routes, Navigate, useLocation } from "react-router-dom";
import logoPath from '../../images/logo.svg';
import burgerPath from '../../images/burger_menu_icon.svg';
import Navigation from "../Navigation/Navigation";

function Header() {
    const isLoggedIn = useLocation().pathname === '/';
    // const isLoggedIn = false;

    return (
        <header className={`header ${isLoggedIn ? 'header_lending' : 'header_primary'}`} >
            <Link to='/' className='header__logo'>
                <img src={logoPath} alt="logo" />
            </Link>
            {/* <img src={logoPath} className='header__logo' alt="logo" /> */}

            <div className="header__container">
                {isLoggedIn ? (
                    <>
                        <Link to="/sign-up" className="header__button header__button_signup">
                            Регистрация
                        </Link>
                        <Link to="/sign-in" className="header__button header__button_signin">
                            Войти
                        </Link>
                    </>
                ) : (
                    <>

                        <img src={burgerPath} className='header__burger' alt="burger menu" />

                        <nav className="header__nav">
                            <NavLink className="nav__link" to="/movies">
                                Фильмы
                            </NavLink>

                            <NavLink className="nav__link" to="/saved-movies">
                                Сохранённые фильмы
                            </NavLink>
                        </nav>

                        <Link to="/profile" className="header__button header__button_account">
                            Аккаунт
                        </Link>
                    </>
                )}
            </div>
        </header >
    );
}

export default Header;

