import React, { useEffect, useState } from "react";

function SearchForm() {
    return (
        <section className="search">
            <form className="search__form">
                <input className="search__input" type="text" placeholder="Фильм" />
                <button className="search__button" type="submit" />
            </form>

            <div className="slider__wrapper">
                <label className="slider-checkbox">
                    <input type="checkbox" />
                    <span className="slider"></span>
                </label>
                <p className="slider__text">Короткометражки</p>
            </div>

            <div className="search__line" />

        </section>
    );
}

export default SearchForm;