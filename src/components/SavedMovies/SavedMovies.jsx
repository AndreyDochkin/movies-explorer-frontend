import React from 'react'
import { useState, useEffect, useContext } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import { filterBySearchText, filterByShortDuration } from '../../utils/utils';
function SavedMovies({ isLoading, setIsLoading, baseUrl, moviesList, savedMoviesList, onSaveClick, onDeleteClick }) {
    const currentUser = useContext(CurrentUserContext);
    const [checkShortMovies, setCheckShortMovies] = useState(false);
    const [findedMoviesList, setFindedMoviesList] = useState([]);
    console.log('Movies findedMoviesList start',findedMoviesList);

    function handleCheckShortMovies() {
        setCheckShortMovies(!checkShortMovies);
    }

    function handleFilterMovies(movies, searchText, checkShortMovies) {
        const filteredMovies = filterBySearchText(movies, searchText);
        const resultMovies = checkShortMovies ?
            filterByShortDuration(filteredMovies) :
            filteredMovies;
        setFindedMoviesList(resultMovies);

        console.log('handle find result',resultMovies);
    }

    function handleSearch(searchText) {
        if (moviesList.length === 0) return;

        localStorage.setItem(`${currentUser.email}:searchText`, searchText);
        localStorage.setItem(`${currentUser.email}:checkShortMovies`, checkShortMovies);

        handleFilterMovies(moviesList, searchText, checkShortMovies);
    }

    useEffect(() => {
        if (findedMoviesList.length === 0) return;
        localStorage.setItem(`${currentUser.email}:movies`, JSON.stringify(findedMoviesList));
    }, [currentUser, findedMoviesList])

    useEffect(() => {
        if (localStorage.getItem(`${currentUser.email}:movies`)) {
            const movies = JSON.parse(localStorage.getItem(`${currentUser.email}:movies`));
            setFindedMoviesList(movies);
        }
    }, [currentUser]);

    useEffect(() => {
        setCheckShortMovies(
            (localStorage.getItem(`${currentUser.email}:checkShortMovies`) === 'true')
                ? true : false)
    }, [currentUser]);


    return (
        <main>
            <SearchForm
                searchText={localStorage.getItem(`${currentUser.email}:searchText`)}
                handleSearch={handleSearch}
                handleCheckShortMovies={handleCheckShortMovies}
                checkShortMovies={checkShortMovies}
            />
            {!isLoading ? <MoviesCardList
                moviesList={findedMoviesList}
                savedMoviesList={savedMoviesList}
                baseUrl={baseUrl}
                onSaveClick={onSaveClick}
                onDeleteClick={onDeleteClick} /> : <Preloader />}
        </main>
    );
}

export default SavedMovies