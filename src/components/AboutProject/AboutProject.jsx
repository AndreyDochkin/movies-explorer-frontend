import React, { useState, useEffect } from 'react';

function AboutProject() {
    return (
        <section className='about'>
            <h2 className='about__title'>О проекте</h2>
            <div className='about__line'></div>

            <div className='about__article-container'>
                <article className='about__article'>
                    <h3 className='about__article-title'>Дипломный проект включал 5 этапов</h3>
                    <p className='about__article-text'>
                        Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                    </p>
                </article>

                <article className='about__article'>
                    <h3 className='about__article-title'>На выполнение диплома ушло 5 недель</h3>
                    <p className='about__article-text'>
                        У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                    </p>
                </article>
            </div>


            <div className='about__timeline'>
                <div className='about__timeline-item'>
                    <div className='about__timeline-item-line'>1 неделя</div>
                    <p className='about__timeline-item-description'>Back-end</p>
                </div>

                <div className='about__timeline-item'>
                    <div className='about__timeline-item-line about__timeline-item-line_secondary'>4 недели</div>
                    <p className='about__timeline-item-description'>Front-end</p>
                </div>
            </div>

        </section>
    );
}

export default AboutProject;
