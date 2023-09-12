import React from 'react'
import { Link , useNavigate} from 'react-router-dom'
function NotFound() {
    const navigate = useNavigate();
    function handleBack(){
        navigate(-1);
    }
    return (
        <main className='not-found'>
            <h1 className='not-found__title'>404</h1>
            <div className='not-found__text'>Страница не найдена</div>
            <Link onClick={handleBack} className='not-found__link'>Назад</Link>
        </main>
    )
}

export default NotFound