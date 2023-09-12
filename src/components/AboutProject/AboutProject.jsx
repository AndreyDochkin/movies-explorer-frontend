import React, { useState, useEffect } from 'react';

function AboutProject() {
    return (
        <section className='about'>
            <h2 className='about__title'>About project</h2>
            <div className='about__line'></div>

            <div className='about__article-container'>
                <article className='about__article'>
                    <h3 className='about__article-title'>Project contains 5 parts</h3>
                    <p className='about__article-text'>
                        Planning, backend development, layout, adding functionality, and final refinements.
                    </p>
                </article>

                <article className='about__article'>
                    <h3 className='about__article-title'>It took 5 weeks to complete the diploma project</h3>
                    <p className='about__article-text'>
                        Each stage had soft and hard deadlines that needed to be met for a successful defense.
                    </p>
                </article>
            </div>


            <div className='about__timeline'>
                <div className='about__timeline-item'>
                    <div className='about__timeline-item-line'>1 week</div>
                    <p className='about__timeline-item-description'>Back-end</p>
                </div>

                <div className='about__timeline-item'>
                    <div className='about__timeline-item-line about__timeline-item-line_secondary'>4 weeks</div>
                    <p className='about__timeline-item-description'>Front-end</p>
                </div>
            </div>

        </section>
    );
}

export default AboutProject;
