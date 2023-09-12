import React, { useEffect, useState } from "react";
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function SearchForm({ searchText, handleSearch, handleCheckShortMovies, checkShortMovies }) {
    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

    useEffect(() => {
        values.search = searchText;
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        handleSearch(values.search, checkShortMovies);
    }

    return (
        <section className="search">
            <form onSubmit={handleSubmit} className="search__form" noValidate>
                <input className="search__input"
                    type="text"
                    placeholder="Movie"
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
                <p className="slider__text">Short Films</p>
            </div>

            <div className="search__line" />

        </section>
    );
}

export default SearchForm;
