import React, { useState, useEffect } from 'react';

function Footer() {
    const date = new Date();
    const currentYear = date.getFullYear();
    return (
        <section className='footer'>
            <h3 className='footer__title'>Учебный проект Яндекс.Практикум х MovieMatchUp.</h3>
            <div className='footer__line'></div>
            <div className='footer__container'>
                <p className='footer__date'>© {currentYear}</p>
                <nav class="footer__nav">
                    <a className='footer__link' href='https://practicum.yandex.ru/'>Яндекс.Практикум</a>
                    <a className='footer__link' href='https://github.com/AndreyDochkin'>GitHub</a>
                </nav>
            </div>

        </section>
    );
}

export default Footer;