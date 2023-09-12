import React, { useState, useEffect } from 'react';
import promoPath from '../../images/promo.svg';

function Promo() {
    return (
        <section className="promo">
            <h1 className='promo__tilte'>Educational project of a Web Development student.</h1>
            <img src={promoPath} className='promo__img' alt="promo" />
        </section>
    );
}

export default Promo;
