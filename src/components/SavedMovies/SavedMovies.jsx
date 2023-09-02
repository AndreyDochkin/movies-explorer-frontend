import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import { filterBySearchText, filterByShortDuration, formatMovies } from '../../utils/utils';

function SavedMovies({ isLoading, setIsLoading, baseUrl, moviesList, savedList, onSaveClick, onDeleteClick }) {
    const navigate = useNavigate();
    const location = useLocation();
    const currentUser = useContext(CurrentUserContext);
    const [checkShortMovies, setCheckShortMovies] = useState(false);
    const [findedMoviesList, setFindedMoviesList] = useState([]);
    const [currentSearchText, setCurrentSearchText] = useState('');

    function handleCheckShortMovies() {
        setCheckShortMovies(!checkShortMovies);
    }

    function handleFilterMovies(movies, searchText, checkShortMovies) {
        const filteredMovies = searchText ? filterBySearchText(movies, searchText) : movies;

        const resultMovies = checkShortMovies ?
            filterByShortDuration(filteredMovies) :
            filteredMovies;
        return resultMovies;
    }

    function handleSearch(searchText) {
        setCurrentSearchText(searchText);
        const searchResult = handleFilterMovies(savedList, searchText, checkShortMovies);
        setFindedMoviesList(searchResult);
    }

    useEffect(() => {
        setFindedMoviesList(savedList);
    }, [savedList]);

    return (
        <main>
            <SearchForm
                searchText={currentSearchText}
                handleSearch={handleSearch}
                handleCheckShortMovies={handleCheckShortMovies}
                checkShortMovies={checkShortMovies}
            />
            {!isLoading ? <MoviesCardList
                moviesList={formatMovies(findedMoviesList,baseUrl)}
                savedList={savedList}
                baseUrl={baseUrl}
                onSaveClick={onSaveClick}
                onDeleteClick={onDeleteClick}
            /> : <Preloader />}
        </main>
    );
}

export default SavedMovies;
