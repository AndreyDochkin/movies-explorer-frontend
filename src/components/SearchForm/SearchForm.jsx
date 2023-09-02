import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function SearchForm({ searchText, handleSearch, handleCheckShortMovies, checkShortMovies }) {
    const location = useLocation();
    const navigate = useNavigate();
    const currentUser = useContext(CurrentUserContext);

    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

    useEffect(() => {
        // Очищаем localStorage при переходе на другой роут
        if (location.pathname === '/movies') return;
        localStorage.removeItem(`${currentUser.email}:movies`);
        localStorage.removeItem(`${currentUser.email}:searchText`);
        localStorage.removeItem(`${currentUser.email}:checkShortMovies`);
    }, [location.pathname, currentUser.email]);

    useEffect(() => {
        values.search = searchText
    }, [searchText]);

    function handleSubmit(e) {
        e.preventDefault();
        handleSearch(values.search);
    }

    return (
        <section className="search">
            <form onSubmit={handleSubmit} className="search__form" noValidate>
                <input className="search__input"
                    type="text"
                    placeholder="Фильм"
                    value={values.search || ''}
                    onChange={handleChange}
                    name="search"
                />
                <button className="search__button" type="submit" />
            </form>

            <div className="slider">
                <label className="slider__checkbox">
                    <input type="checkbox"
                        onChange={handleCheckShortMovies}
                        checked={checkShortMovies} />
                    <span className="slider__element"></span>
                </label>
                <p className="slider__text">Короткометражки</p>
            </div>

            <div className="search__line" />

        </section>
    );
}

export default SearchForm;