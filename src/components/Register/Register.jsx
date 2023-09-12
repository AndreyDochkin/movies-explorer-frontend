import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoPath from '../../images/logo.svg';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function Register({ registrationUser, signupError }) {
    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

    function handleSubmit(event) {
        event.preventDefault();
        registrationUser(values.email, values.password, values.name);
        resetForm();
    }

    return (
        <main className="register">

            <Link to='/' className='register__logo'>
                <img src={logoPath} alt="logo" />
            </Link>

            <h2 className="register__title">Welcome!</h2>
            <form onSubmit={handleSubmit} className="register__form" noValidate>
                <label htmlFor='name' className="register__label">Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={values.name || ''}
                    className={`register__input ${errors.name && 'register__input_error'}`}
                    onChange={handleChange}
                    placeholder='Enter your name'
                    minLength={3}
                    maxLength={30}
                    required
                />
                <span className="register__error">{errors.name || ''}</span>

                <label htmlFor='email' className="register__label">E-mail</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={values.email || ''}
                    className={`register__input ${errors.email && 'register__input_error'}`}
                    onChange={handleChange}
                    placeholder='Enter your e-mail'
                    required
                />
                <span className="register__error">{errors.email || ''}</span>

                <label htmlFor='password' className="register__label">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={values.password || ''}
                    className={`register__input ${errors.password && 'register__input_error'}`}
                    onChange={handleChange}
                    placeholder='Enter your password'
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
                    Register
                </button>

                <div className="register__line" >
                    <span className='register__text'>Already registered?</span>
                    <Link to="/sign-in" className="register__link">Sign In</Link>
                </div>


            </form>
        </main>
    );
}

export default Register;
