import React, { useState, useEffect } from 'react';

function Techs() {
    return (
        <section className='techs'>
            <h2 className='techs__title'>Технологии</h2>
            <div className='techs__line'></div>

            <div className='techs__article-container'>
                <article className='techs__article'>
                    <h3 className='techs__article-title'>7 технологий</h3>
                    <p className='techs__article-text'>
                        На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
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
                   <li className='techs__list-item'>mongoDB</li>
               </ul>
            </div>

        </section>
    );
}

export default Techs;
