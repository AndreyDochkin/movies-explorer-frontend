import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ moviesList, savedList, baseUrl, onSaveClick, onDeleteClick, isSavedMoviesRoute }) {
    const location = useLocation();
    const [moviesDisplay, setMoviesDisplay] = useState([]);
    const [totalDisplay, setTotalDisplay] = useState(12); //total amount of displaed movies
    const [deltaDisplay, setDeltaDisplay] = useState(3); //grower for amount of dislaped movies
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [isMoviesListLoaded, setIsMoviesListLoaded] = useState(false);

    const handleResize = () => {
        setTimeout(() => {
            setScreenWidth(window.innerWidth);
        }, 1000);
    };

    function handleClickMoreMovies() {
        setTotalDisplay(totalDisplay + deltaDisplay);
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (screenWidth > 1200) {
            setTotalDisplay(9);
            setDeltaDisplay(3);
        } else if (screenWidth <= 1200 && screenWidth > 600) {
            setTotalDisplay(8);
            setDeltaDisplay(2);

        } else {
            setTotalDisplay(5);
            setDeltaDisplay(1);
        }
    }, [screenWidth])


    useEffect(() => {
        if (moviesList.length) setMoviesDisplay(moviesList.slice(0, totalDisplay));
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
                    <div className='movies__not-found'> Ничего не найдено</div>
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