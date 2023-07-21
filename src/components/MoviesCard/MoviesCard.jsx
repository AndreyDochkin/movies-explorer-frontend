import React, { useState } from "react";
import { useContext } from 'react';

function MoviesCard(props) {
    const isOwn = false;
    // let isSaved = false;
    const [isSaved, setIsSaved] = useState(false);

    function handleClick() {
        // props.onCardClick(props.card);
    }

    function handleSave() {
        setIsSaved(!isSaved);
        // props.onCardLike(props.card);
    }

    return (
        <div className="movie__item">

            <div className="movie__header">
                <div className="movie__text">
                    <h2 className="movie__title">{props.movie.nameRU}</h2>
                    <p className="movie__duration">{props.movie.duration}</p>
                </div>

                <button className={`movie__save ${isSaved && 'movie__save_active'}`} type="button" onClick={handleSave} />
            </div>
            
            <img className="movie__image" src={props.movie.image} alt={props.movie.nameRU}  onClick={handleClick} />
        </div>
    );
}

export default MoviesCard;