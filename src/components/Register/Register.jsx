import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logoPath from '../../images/logo.svg';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function Register({ registrationUser , signupError}) {
    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();


    function handleSubmit(event) {
        event.preventDefault();
        registrationUser(values.email, values.password, values.name);
    }

    useEffect(() => {
        resetForm();
    }, [resetForm]);

    return (
        <main className="register">

            <Link to='/' className='register__logo'>
                <img src={logoPath} alt="logo" />
            </Link>

            <h2 className="register__title">Добро пожаловать!</h2>
            <form onSubmit={handleSubmit} className="register__form" noValidate>
                <label for='name' className="register__label">Имя</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={values.name || ''}
                    className={`register__input ${errors.name && 'register__input_error'}`}
                    onChange={handleChange}
                    placeholder='Введите имя'
                    minLength={3}
                    maxLength={30}
                    required
                />
                <span className="register__error">{errors.name || ''}</span>

                <label for='email' className="register__label">E-mail</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={values.email || ''}
                    className={`register__input ${errors.email && 'register__input_error'}`}
                    onChange={handleChange}
                    placeholder='Введите e-mail'
                    required
                />
                <span className="register__error">{errors.email || ''}</span>

                <label for='password' className="register__label">Пароль</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={values.password || ''}
                    className={`register__input ${errors.password && 'register__input_error'}`}
                    onChange={handleChange}
                    placeholder='Введите пароль'
                    pattern="^.{6,}$"
                    required
                />
                <span className="register__error">{errors.password || ''}</span>
                <div className='register__error'>{signupError || ''}</div>
                <button
                    type="submit"
                    className={`register__button ${!isValid && 'register__button_disabled'}`}
                    disabled={!isValid}
                >
                    Зарегистрироваться
                </button>

                <div className="register__line" >
                    <span className='register__text'>Уже зарегистрированы?</span>
                    <Link to="/sign-in" className="register__link">Войти</Link>
                </div>


            </form>
        </main>
    )
}

export default Register