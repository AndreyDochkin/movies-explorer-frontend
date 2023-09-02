import React, { useEffect, useState } from "react";
import { useContext } from 'react';
import { Link, useLocation } from "react-router-dom";

import {convertDurationToHoursMinutes} from '../../utils/utils';

function MoviesCard({ isSavedMoviesRoute, isMovieSaved, movie,onDeleteClick,onSaveClick,baseUrl}) {
    // const useLocation().pathname === '/saved-movies';

    function handleClick() {
        window.open(movie.trailerLink, '_blank');
    }

    function handleSaveMovie() {
        isMovieSaved ? onDeleteClick(movie) : onSaveClick(movie);
    }

    function handleDeleteMovie() {
        onDeleteClick(movie);
    }

    return (
        <li className="movie-item">

            <div className="movie-item__header">
                <div className="movie-item__text">
                    <h2 className="movie-item__title">{movie.nameRU}</h2>
                    <p className="movie-item__duration">{convertDurationToHoursMinutes(movie.duration)}</p>
                </div>

                <button className={`movie-item__save ${isMovieSaved && 'movie-item__save_active'}  ${isSavedMoviesRoute && 'movie-item__delete'}`}
                    type="button"
                    onClick={isSavedMoviesRoute ? handleDeleteMovie : handleSaveMovie} />
            </div>

            <img className="movie-item__image" src={`${baseUrl}${movie.image.url}`} alt={movie.nameRU} onClick={handleClick} />
        </li>
    );
}

export default MoviesCard;