import React from "react";
import { useState, useEffect } from "react";
import { Link, NavLink, Route, Routes, Navigate, useLocation } from "react-router-dom";
import logoPath from '../../images/logo.svg';
import burgerPath from '../../images/burger_menu_icon.svg';
import closePath from '../../images/close_icon.svg';
import Navigation from "../Navigation/Navigation";

function Header() {
    const isLoggedIn = useLocation().pathname === '/';
    // const isLoggedIn = true;
    const isBurger = true;
    const [burgerIsOpen, setBurgerIsOpen] = useState(false);

    function handleOpenCloseBurgerMenu() {
        setBurgerIsOpen(!burgerIsOpen);
    }

    return (
        <header className={`header ${isLoggedIn ? 'header_lending' : 'header_primary'}`} >
            <Link to='/' className='header__logo'>
                <img src={logoPath} alt="logo" />
            </Link>

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
                        {/* {isBurger ?
                            (<> */}
                                <img src={burgerPath} className='header__burger' alt="burger menu" onClick={handleOpenCloseBurgerMenu} />

                                <div className={`side-menu ${burgerIsOpen ? 'side-menu_open ' : ''}`}>
                                    <div className="side-menu__container">
                                        <img src={closePath} className='side-menu__close' alt="burger close" onClick={handleOpenCloseBurgerMenu} />
                                        <NavLink to="/" className="side-menu__link" >Главная</NavLink>
                                        <NavLink to="/movies" className="side-menu__link">Фильмы</NavLink>
                                        <NavLink to="/saved-movies" className="side-menu__link" >Сохранённые фильмы</NavLink>
                                        <NavLink to="/profile" className="side-menu__account header__button header__button_account" >Аккаунт</NavLink>
                                    </div>
                                </div>
                            {/* </>) :
                            (<> */}
                                <nav className="nav">
                                    <NavLink to="/movies" className="nav__link">Фильмы</NavLink>
                                    <NavLink to="/saved-movies" className="nav__link" >Сохранённые фильмы</NavLink>
                                </nav>
                                <NavLink to="/profile" className="header__button header__button_account">Аккаунт</NavLink>

                            {/* </>)} */}



                    </>
                )}
            </div>
        </header >
    );
}

export default Header;

