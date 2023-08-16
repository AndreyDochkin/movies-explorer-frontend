import React, { useState, useEffect } from 'react';
import photoPath from '../../images/document_photo_2.jpg';
import arrowPath from '../../images/arrow.svg';

function Portfolio() {
    return (
        <section className='portfolio'>
            <h2 className='portfolio__title'>Студент</h2>
            <div className='portfolio__line'></div>

            <div className='portfolio__article-container'>
                <article className='portfolio__article'>
                    <h3 className='portfolio__article-title'>Андрей</h3>
                    <p className='portfolio__article-subtitle'>Фронтенд-разработчик, 35 лет</p>
                    <p className='portfolio__article-text'>
                        Я родился в Санкт-Петербурге и окончил электротехнический университет "ЛЭТИ". Мой карьерный путь начался с разработки встраиваемых систем на C/C++. Недавно я закончил курс по веб-разработке от Practicum от Yandex, где углубил свои знания и навыки в области веб-разработки. Это расширило мои знания и навыки в создании веб-приложений.
                    </p>
                    <a className='portfolio__article-link' href='https://github.com/AndreyDochkin' target="_blank" rel="noopener noreferrer">GitHub</a>
                </article>
                <img className='portfolio__article-img' src={photoPath} alt='Portfolio author' />
            </div>

            <h3 className='portfolio__list-title'>Портфолио</h3>
            <ul className='portfolio__list'>

                <li className='portfolio__list-item'>
                    <a className='portfolio__list-link' href='https://github.com/AndreyDochkin/how-to-learn' target="_blank" rel="noopener noreferrer">Статичный сайт</a>
                    <img className='portfolio__list-img' src={arrowPath} alt="Arrow icon" />
                </li>

                <li className='portfolio__list-line'></li>

                <li className='portfolio__list-item'>
                    <a className='portfolio__list-link' href='https://github.com/AndreyDochkin/russian-travel' target="_blank" rel="noopener noreferrer">Адаптивный сайт</a>
                    <img className='portfolio__list-img' src={arrowPath} alt="Arrow icon" />
                </li>

                <li className='portfolio__list-line'></li>

                <li className='portfolio__list-item'>
                    <a className='portfolio__list-link' href='https://github.com/AndreyDochkin/react-mesto-api-full-gha' target="_blank" rel="noopener noreferrer">Одностраничное приложение</a>
                    <img className='portfolio__list-img' src={arrowPath} alt="Arrow icon" />
                </li>
            </ul>

        </section>
    );
}

export default Portfolio;