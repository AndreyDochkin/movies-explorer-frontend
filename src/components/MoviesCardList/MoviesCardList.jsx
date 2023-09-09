import React, { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { DESKTOP_WIDTH, MOBILE_WIDTH } from '../../utils/constants';
import { MOVIES_AMOUNT, MOVIES_DELTA } from '../../utils/constants';

function MoviesCardList({ moviesList, savedList, baseUrl, onSaveClick, onDeleteClick, isSavedMoviesRoute, isFirstRender }) {
    const [moviesDisplay, setMoviesDisplay] = useState([]);
    const [totalDisplay, setTotalDisplay] = useState(MOVIES_AMOUNT.DESKTOP); //total amount of displaed movies
    const [deltaDisplay, setDeltaDisplay] = useState(MOVIES_DELTA.DESKTOP); //grower for amount of dislaped movies
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [isMoviesListLoaded, setIsMoviesListLoaded] = useState(false);

    const handleResize = () => {
        setTimeout(() => {
            setScreenWidth(window.innerWidth);
        }, 1000);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    function handleClickMoreMovies() {
        setTotalDisplay(totalDisplay + deltaDisplay);
    }

    useEffect(() => {
        if (screenWidth > DESKTOP_WIDTH) {
            setTotalDisplay(MOVIES_AMOUNT.DESKTOP);
            setDeltaDisplay(MOVIES_DELTA.DESKTOP);
        } else if (screenWidth <= DESKTOP_WIDTH && screenWidth > MOBILE_WIDTH) {
            setTotalDisplay(MOVIES_AMOUNT.TABLET);
            setDeltaDisplay(MOVIES_DELTA.TABLET);
        } else {
            setTotalDisplay(MOVIES_AMOUNT.MOBILE);
            setDeltaDisplay(MOVIES_DELTA.MOBILE);
        }
    }, [screenWidth])


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
                    <div className='movies__not-found'> {isFirstRender ? '' : 'Ничего не найдено'}</div>
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

            {!isSavedMoviesRoute && moviesList.length > totalDisplay && (
                <button type="button"
                    className="movies__button-more"
                    onClick={handleClickMoreMovies}
                >
                    Ещё
                </button>
            )}

        </section>

    )
}

export default MoviesCardList;