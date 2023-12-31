import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logoPath from '../../images/logo.svg';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function Login({ loginUser, loginError }) {
    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

    function handleSubmit(event) {
        event.preventDefault();
        loginUser(values.email, values.password);
        resetForm();
    }

    return (
        <main className="login">

            <Link to='/' className='login__logo'>
                <img src={logoPath} alt="logo" />
            </Link>

            <h2 className="login__title">Welcome!</h2>
            <form onSubmit={handleSubmit} className="login__form">

                <label className="login__label">E-mail</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={values.email || ''}
                    className={`login__input ${errors.email && 'login__input_error'}`}
                    onChange={handleChange}
                    placeholder='Enter your e-mail'
                    required
                />
                <span className="login__error">{errors.email || ''}</span>

                <label className="login__label">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={values.password || ''}
                    className={`login__input ${errors.password && 'login__input_error'}`}
                    onChange={handleChange}
                    placeholder='Enter your password'
                    // pattern="^.{6,}$"
                    required
                />
                <span className="login__error">{errors.password || ''}</span>
                <div className='register__error'>{loginError || ''}</div>

                <button
                    type="submit"
                    className={`login__button ${!isValid && 'login__button_disabled'}`}
                    disabled={!isValid}
                >
                    Log In
                </button>

                <div className="login__line" >
                    <span className='login__text'>Not registered yet?</span>
                    <Link to="/sign-up" className="login__link">Register</Link>
                </div>

            </form>
        </main>
    )
}

export default Login;
