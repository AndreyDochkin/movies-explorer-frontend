import React, { useEffect, useState, useRef } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { DESKTOP_WIDTH, MOBILE_WIDTH, TABLET_WIDTH } from '../../utils/constants';
import { MOVIES_AMOUNT, MOVIES_DELTA } from '../../utils/constants';

function MoviesCardList({ moviesList, savedList, baseUrl, onSaveClick, onDeleteClick, isSavedMoviesRoute, isFirstRender }) {
    const [moviesDisplay, setMoviesDisplay] = useState([]);
    const [totalDisplay, setTotalDisplay] = useState(MOVIES_AMOUNT.DESKTOP); //total amount of displayed movies
    const [deltaDisplay, setDeltaDisplay] = useState(MOVIES_DELTA.DESKTOP); //growth for the amount of displayed movies
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const [isMoviesListLoaded, setIsMoviesListLoaded] = useState(false);

    const handleResize = () => {
        setTimeout(() => {
            setScreenWidth(window.innerWidth);
        }, 100);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => { window.removeEventListener('resize', handleResize); };
    }, [screenWidth]);

    function handleClickMoreMovies() {
        setTotalDisplay(totalDisplay + deltaDisplay);
    }

    useEffect(() => {
        let total;
        let delta;

        if (screenWidth >= DESKTOP_WIDTH) {
            total = MOVIES_AMOUNT.DESKTOP;
            delta = MOVIES_DELTA.DESKTOP;
        } else if (screenWidth < DESKTOP_WIDTH && screenWidth > MOBILE_WIDTH) {
            total = MOVIES_AMOUNT.TABLET;
            delta = MOVIES_DELTA.TABLET;
        } else {
            total = MOVIES_AMOUNT.MOBILE;
            delta = MOVIES_DELTA.MOBILE;
        }

        setTotalDisplay(total);
        setDeltaDisplay(delta);

        if (moviesList.length && !isSavedMoviesRoute) setMoviesDisplay(moviesList.slice(0, total))
        else setMoviesDisplay(moviesList);

    }, [screenWidth, moviesList]);

    useEffect(() => {
        if (moviesList.length && !isSavedMoviesRoute) setMoviesDisplay(moviesList.slice(0, totalDisplay))
        else setMoviesDisplay(moviesList);
    }, [totalDisplay, moviesList]);

    useEffect(() => {
        setIsMoviesListLoaded(moviesList.length === 0 ? true : false);
    }, [moviesList, isMoviesListLoaded]);

    function checkIsMovieSaved(list, item) {
        return !isSavedMoviesRoute ? list.some((movie) => movie.movieId === (item.movieId || item.id)) : false;
    }

    return (
        <section className="movies">
            <ul className="movies__list"> {
                isMoviesListLoaded ?
                    <div className='movies__not-found'> {isFirstRender ? '' : 'Nothing found'}</div>
                    :
                    moviesDisplay.map((movie) => (
                        <MoviesCard
                            baseUrl={baseUrl}
                            movie={movie}
                            isMovieSaved={checkIsMovieSaved(savedList, movie)}
                            key={movie.id || movie.movieId}
                            onSaveClick={onSaveClick}
                            onDeleteClick={onDeleteClick}
                            isSavedMoviesRoute={isSavedMoviesRoute} />
                    ))
            }
            </ul>

            {(!isSavedMoviesRoute && moviesList.length) > totalDisplay && (
                <button type="button"
                    className="movies__button-more"
                    onClick={handleClickMoreMovies}
                >
                    More
                </button>
            )}

        </section>

    )
}

export default MoviesCardList;
