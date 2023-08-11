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
        <div className="movie-item">

            <div className="movie-item__header">
                <div className="movie-item__text">
                    <h2 className="movie-item__title">{props.movie.nameRU}</h2>
                    <p className="movie-item__duration">{props.movie.duration}</p>
                </div>

                <button className={`movie-item__save ${isSaved && 'movie-item__save_active'}`} type="button" onClick={handleSave} />
            </div>
            
            <img className="movie-item__image" src={props.movie.image} alt={props.movie.nameRU}  onClick={handleClick} />
        </div>
    );
}

export default MoviesCard;