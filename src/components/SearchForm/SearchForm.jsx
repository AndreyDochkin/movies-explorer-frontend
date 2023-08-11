import React, { useEffect, useState } from "react";

function SearchForm() {
    return (
        <section className="search">
            <form className="search__form">
                <input className="search__input" type="text" placeholder="Фильм" />
                <button className="search__button" type="submit" />
            </form>

            <div className="slider">
                <label className="slider__checkbox">
                    <input type="checkbox" />
                    <span className="slider__element"></span>
                </label>
                <p className="slider__text">Короткометражки</p>
            </div>

            <div className="search__line" />

        </section>
    );
}

export default SearchForm;