import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import movies from '../../utils/mockMoviesListArray';
function MoviesCardList() {
    const [moviesDisplay, setMoviesDisplay] = useState([]);
    const [totalDisplay, setTotalDisplay] = useState(12); //total amount of displaed movies
    const [deltaDisplay, setDeltaDisplay] = useState(12); //grower for amount of dislaped movies

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setScreenWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (screenWidth > 1200) {
            setTotalDisplay(12);
            setDeltaDisplay(12);
        } else if (screenWidth <= 1200 && screenWidth > 600) {
            setTotalDisplay(8);
            setDeltaDisplay(8);

        } else {
            setTotalDisplay(4);
            setDeltaDisplay(4);
        }
    }, [screenWidth])


    useEffect(() => {
        if (movies.length) setMoviesDisplay(movies.slice(0, totalDisplay));
    }, [totalDisplay]);

    function handleClickMoreMovies() {
        console.log('click');
        setTotalDisplay(totalDisplay + deltaDisplay);
    }

    return (
        <section className="movies">
            <div className="movies__list">
                {moviesDisplay.map((movie) => (
                    <MoviesCard
                        movie={movie}
                        key={movie._id} />
                ))}
            </div>

            <button
                className="movies__button-more"
                onClick={handleClickMoreMovies}
            >
                Ещё
            </button>

        </section>

    )
}

export default MoviesCardList;