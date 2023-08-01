import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logoPath from '../../images/logo.svg';

function Register() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <section className="register">

            <Link to='/' className='register__logo'>
                <img src={logoPath} alt="logo" />
            </Link>

            <h2 className="register__title">Регистрация</h2>
            <form onSubmit={handleSubmit} className="register__form">
                <label for='name' className="register__label">Имя</label>
                <input
                    id="name"
                    name="name"
                    type="name"
                    value={name}
                    minLength={3}
                    className="register__input"
                    onChange={(e) => setName(e.target.value)}
                />
                <span className="register__input-error">Что-то пошло не так...</span>

                <label for='email' className="register__label">E-mail</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    minLength={3}
                    className="register__input"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <span className="register__input-error">Что-то пошло не так...</span>

                <label for='password' className="register__label">Пароль</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    minLength={3}
                    className="register__input"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <span className="register__input-error">Что-то пошло не так...</span>

                <button type="submit" className="register__button">
                    Зарегистрироваться
                </button>

                <div className="register__line" >
                <span className='register__text'>Уже зарегистрированы?</span>
                <Link to="/sign-in" className="register__link">Войти</Link>
                </div>
                

            </form>
        </section>
    )
}

export default Register