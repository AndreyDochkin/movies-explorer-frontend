import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import { filterBySearchText, filterByShortDuration } from '../../utils/utils';

function Movies({ isLoading, setIsLoading, baseUrl, moviesList, savedList, onSaveClick, onDeleteClick, isSavedMoviesRoute }) {
    const navigate = useNavigate();
    const location = useLocation();
    const currentUser = useContext(CurrentUserContext);

    const [checkShortMovies, setCheckShortMovies] = useState(
        localStorage.getItem(`${currentUser.email}:checkShortMovies`) === 'true'
    );
    const [findedMoviesList, setFindedMoviesList] = useState(
        JSON.parse(localStorage.getItem(`${currentUser.email}:movies`)) || []
    );
    const [currentSearchText, setCurrentSearchText] = useState(
        localStorage.getItem(`${currentUser.email}:searchText`) || ''
    );

    function handleSearch(searchText) {
        const filteredMovies = searchText ? filterBySearchText(moviesList, searchText) : moviesList;
        const searchResult = checkShortMovies ? filterByShortDuration(filteredMovies) : filteredMovies;

        setFindedMoviesList(searchResult);
        setCurrentSearchText(searchText);
        setFindedMoviesList(searchResult);

        localStorage.setItem(`${currentUser.email}:movies`, JSON.stringify(searchResult));
        localStorage.setItem(`${currentUser.email}:searchText`, searchText);
        localStorage.setItem(`${currentUser.email}:checkShortMovies`, checkShortMovies);
    }

    // useEffect(() => {
    //     setFindedMoviesList(moviesList);
    // }, [moviesList]);

    function handleCheckShortMovies() {
        setCheckShortMovies(!checkShortMovies);
    }


    return (
        <main>
            <SearchForm
                searchText={currentSearchText}
                handleSearch={handleSearch}
                handleCheckShortMovies={handleCheckShortMovies}
                checkShortMovies={checkShortMovies}
                listFound={moviesList.length>0} //это нужно что бы дождаться зашруженных данных и только потом искать при нажатии переключателя
            />
            {!isLoading ? <MoviesCardList
                moviesList={findedMoviesList}
                savedList={savedList}
                baseUrl={baseUrl}
                onSaveClick={onSaveClick}
                onDeleteClick={onDeleteClick}
                isSavedMoviesRoute={isSavedMoviesRoute}
            /> : <Preloader />}
        </main>
    );
}

export default Movies;
