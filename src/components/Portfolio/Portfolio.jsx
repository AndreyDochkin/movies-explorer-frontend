import React, { useState, useEffect } from 'react';
import photoPath from '../../images/document_photo_2.jpg';
import arrowPath from '../../images/arrow.svg';

function Portfolio() {
    return (
        <section className='portfolio'>
            <h2 className='portfolio__title'>Frontend developer</h2>
            <div className='portfolio__line'></div>

            <div className='portfolio__article-container'>
                <article className='portfolio__article'>
                    <h3 className='portfolio__article-title'>Andrei Dochkin</h3>
                    <p className='portfolio__article-subtitle'>Front-end Developer, 35 years old</p>
                    <p className='portfolio__article-text'>
                        I was born in Saint Petersburg and graduated from the Electrotechnical University "LETI". My career path started with embedded systems development in C/C++. Recently, I completed a web development course from Practicum by Yandex, where I deepened my knowledge and skills in web development. This expanded my expertise in creating web applications.
                    </p>
                    <a className='portfolio__article-link' href='https://github.com/AndreyDochkin' target="_blank" rel="noopener noreferrer">GitHub</a>
                </article>
                <img className='portfolio__article-img' src={photoPath} alt='Portfolio author' />
            </div>

            <h3 className='portfolio__list-title'>Portfolio</h3>
            <ul className='portfolio__list'>

                <li className='portfolio__list-item'>
                    <a className='portfolio__list-link' href='https://github.com/AndreyDochkin/how-to-learn' target="_blank" rel="noopener noreferrer">Static website</a>
                    <img className='portfolio__list-img' src={arrowPath} alt="Arrow icon" />
                </li>

                <li className='portfolio__list-line'></li>

                <li className='portfolio__list-item'>
                    <a className='portfolio__list-link' href='https://github.com/AndreyDochkin/russian-travel' target="_blank" rel="noopener noreferrer">Adaptive website</a>
                    <img className='portfolio__list-img' src={arrowPath} alt="Arrow icon" />
                </li>

                <li className='portfolio__list-line'></li>

                <li className='portfolio__list-item'>
                    <a className='portfolio__list-link' href='https://github.com/AndreyDochkin/react-mesto-api-full-gha' target="_blank" rel="noopener noreferrer">Single-page application</a>
                    <img className='portfolio__list-img' src={arrowPath} alt="Arrow icon" />
                </li>
            </ul>

        </section>
    );
}

export default Portfolio;
