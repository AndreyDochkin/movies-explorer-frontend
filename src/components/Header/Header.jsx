import React from "react";
import { useState, useEffect } from "react";
import { Link, NavLink, Route, Routes, Navigate, useLocation } from "react-router-dom";
import logoPath from '../../images/logo.svg';
import burgerPath from '../../images/burger_menu_icon.svg';
import closePath from '../../images/close_icon.svg';

function Header({ isLoggedIn }) {
    const isMainPage = useLocation().pathname === '/';
    // const isLoggedIn = true;
    const isBurger = true;
    const [burgerIsOpen, setBurgerIsOpen] = useState(false);

    function handleOpenCloseBurgerMenu() {
        setBurgerIsOpen(!burgerIsOpen);
    }

    return (
        <header className={`header ${isMainPage ? 'header_landing' : 'header_primary'}`} >
            <Link to='/' className='header__logo'>
                <img src={logoPath} alt="logo" />
            </Link>

            <div className="header__container">
                {!isLoggedIn ? (
                    <>
                        <Link to="sign-up" className="header__button header__button_signup">
                            Sign Up
                        </Link>
                        <Link to="sign-in" className="header__button header__button_signin">
                            Sign In
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
                                <NavLink to="/" className="side-menu__link" >Home</NavLink>
                                <NavLink to="/movies" className="side-menu__link">Movies</NavLink>
                                <NavLink to="/saved-movies" className="side-menu__link">Saved Movies</NavLink>
                                <NavLink to="/profile" className="side-menu__account header__button header__button_account" >Account</NavLink>
                            </div>
                        </div>
                        {/* </>) :
                            (<> */}
                        <nav className="nav">
                            <NavLink to="/movies" className={`nav__link ${isMainPage ? 'nav__link_white' : ''}`}>Movies</NavLink>
                            <NavLink to="/saved-movies" className={`nav__link ${isMainPage ? 'nav__link_white' : ''}`}>Saved Movies</NavLink>
                        </nav>
                        <NavLink to="/profile" className="header__button header__button_account">Account</NavLink>

                        {/* </>)} */}

                    </>
                )}
            </div>
        </header >
    );
}

export default Header;
