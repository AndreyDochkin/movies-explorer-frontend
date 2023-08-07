import React from 'react'
import { Link } from 'react-router-dom'
function NotFound() {
    return (
        <section className='not-found'>
            <h1 className='not-found__title'>404</h1>
            <div className='not-found__text'>Страница не найдена</div>
            <Link to='../' className='not-found__link'>Назад</Link>
        </section>
    )
}

export default NotFound