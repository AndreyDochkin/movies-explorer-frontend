import React from 'react'
import { useState, useEffect, useContext } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import { filterBySearchText, filterByShortDuration } from '../../utils/utils';

function Movies({ isLoading, setIsLoading, baseUrl, moviesList, savedList, onSaveClick, onDeleteClick, isSavedMoviesRoute }) {
    const currentUser = useContext(CurrentUserContext);
    const [checkShortMovies, setCheckShortMovies] = useState(false);
    const [findedMoviesList, setFindedMoviesList] = useState([]);
    const [currentSearchText, setCurrentSearchText] = useState('');



    console.log("Movies findedMoviesList", findedMoviesList);

    function handleCheckShortMovies() {
        setCheckShortMovies(!checkShortMovies);
    }

    function handleFilterMovies(movies, searchText, checkShortMovies) {
        const filteredMovies = searchText ? filterBySearchText(movies, searchText) : movies;

        const resultMovies = checkShortMovies ?
            filterByShortDuration(filteredMovies) :
            filteredMovies;
        return resultMovies
    }

    function handleSearch(searchText) {
        localStorage.setItem(`${currentUser.email}:searchText`, searchText);
        localStorage.setItem(`${currentUser.email}:checkShortMovies`, checkShortMovies);
        setCurrentSearchText(searchText);

        const searchResult = handleFilterMovies(moviesList, searchText, checkShortMovies);

        if (!isSavedMoviesRoute) localStorage.setItem(`${currentUser.email}:movies`, JSON.stringify(searchResult));


        setFindedMoviesList(searchResult);
    }

    useEffect(() => {
        if (isSavedMoviesRoute) setFindedMoviesList(moviesList);
    }, [moviesList, isSavedMoviesRoute]);

    useEffect(() => {
        if (!isSavedMoviesRoute && localStorage.getItem(`${currentUser.email}:movies`)&& currentSearchText) {
            const movies = JSON.parse(localStorage.getItem(`${currentUser.email}:movies`));
            setFindedMoviesList(movies);
        }
    }, [currentUser, isSavedMoviesRoute, currentSearchText]);

    useEffect(() => {
        setCheckShortMovies(
            (localStorage.getItem(`${currentUser.email}:checkShortMovies`) === 'true')
                ? true : false)
    }, [currentUser, checkShortMovies]);

    useEffect(() => {
        setCurrentSearchText(localStorage.getItem(`${currentUser.email}:searchText`));
        if (isSavedMoviesRoute) localStorage.setItem(`${currentUser.email}:searchText`, '');

    }, [currentUser, currentSearchText, isSavedMoviesRoute]);

    function formatMovies(list) {
        console.log(list);
        return list.map(item => {
            console.log(item);
            return {
                ...item,
                id: item.movieId,
                image: {
                    url: item.image.replace(baseUrl, "")
                },
            }
        });
    }

    return (
        <main>
            <SearchForm
                searchText={currentSearchText}//{localStorage.getItem(`${currentUser.email}:searchText`)}
                handleSearch={handleSearch}
                handleCheckShortMovies={handleCheckShortMovies}
                checkShortMovies={checkShortMovies}
                isSavedMoviesRoute={isSavedMoviesRoute}
            />
            {!isLoading ? <MoviesCardList
                moviesList={isSavedMoviesRoute ? formatMovies(findedMoviesList) : findedMoviesList}
                // moviesList={findedMoviesList}
                savedList={savedList}
                baseUrl={baseUrl}
                onSaveClick={onSaveClick}
                onDeleteClick={onDeleteClick}
                isSavedMoviesRoute={isSavedMoviesRoute} /> : <Preloader />}
        </main>
    );
}

export default Movies

