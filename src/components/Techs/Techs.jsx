import React, { useState, useEffect } from 'react';

function Techs() {
    return (
        <section className='techs'>
            <h2 className='techs__title'>Technologies</h2>
            <div className='techs__line'></div>

            <div className='techs__article-container'>
                <article className='techs__article'>
                    <h3 className='techs__article-title'>7 technologies</h3>
                    <p className='techs__article-text'>
                        In the web development course, we mastered the technologies that we applied in the diploma project.
                    </p>
                </article>
            </div>

            <div className='techs__list'>
                <ul className='techs__list-items'>
                    <li className='techs__list-item'>HTML</li>
                    <li className='techs__list-item'>CSS</li>
                    <li className='techs__list-item'>JS</li>
                    <li className='techs__list-item'>React</li>
                    <li className='techs__list-item'>Git</li>
                    <li className='techs__list-item'>Express.js</li>
                    <li className='techs__list-item'>MongoDB</li>
                </ul>
            </div>

        </section>
    );
}

export default Techs;
