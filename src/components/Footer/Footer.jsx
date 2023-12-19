import React, { useState, useEffect } from 'react';

function Footer() {
    const date = new Date();
    const currentYear = date.getFullYear();
    return (
        <footer className='footer'>
            {/* <h3 className='footer__title'>Educational project MovieMatchUp.</h3> */}
            <div className='footer__line'></div>
            <div className='footer__container'>
                <p className='footer__date'>© {currentYear}</p>
                <nav className="footer__nav">
                    {/* <a className='footer__link' href='https://practicum.yandex.ru/' target="_blank" rel="noopener noreferrer">Yandex.Practicum</a> */}
                    <a className='footer__link' href='https://github.com/AndreyDochkin' target="_blank" rel="noopener noreferrer">GitHub</a>
                </nav>
            </div>

        </footer>
    );
}

export default Footer;
