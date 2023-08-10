import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logoPath from '../../images/logo.svg';

function Login() {
  const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <section className="login">

            <Link to='/' className='login__logo'>
                <img src={logoPath} alt="logo" />
            </Link>

            <h2 className="login__title">Рады видеть!</h2>
            <form onSubmit={handleSubmit} className="login__form">
              
                <label for='email' className="login__label">E-mail</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    minLength={3}
                    className="login__input"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <span className="login__input-error">Что-то пошло не так...</span>

                <label for='password' className="login__label">Пароль</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    minLength={3}
                    className="login__input"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <span className="login__input-error">Что-то пошло не так...</span>

                <button type="submit" className="login__button">
                    Войти
                </button>

                <div className="login__line" >
                <span className='login__text'>Ещё не зарегистрированы?</span>
                <Link to="/sign-up" className="login__link">Регистрация</Link>
                </div>
                

            </form>
        </section>
    )
}

export default Login