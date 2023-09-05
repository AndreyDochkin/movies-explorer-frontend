import React, { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

import { filterBySearchText, filterByShortDuration, formatMoviesLoacalToApi } from '../../utils/utils';

function SavedMovies({ isLoading, baseUrl, moviesList, savedList, onSaveClick, onDeleteClick, isSavedMoviesRoute }) {
    const [checkShortMovies, setCheckShortMovies] = useState(false);
    const [findedMoviesList, setFindedMoviesList] = useState([]);
    const [currentSearchText, setCurrentSearchText] = useState('');

    function handleCheckShortMovies() {
        setCheckShortMovies(!checkShortMovies);
    }

    function handleSearch(searchText) {
        const filteredMovies = searchText ? filterBySearchText(savedList, searchText) : savedList;
        const searchResult = checkShortMovies ? filterByShortDuration(filteredMovies) : filteredMovies;
        setFindedMoviesList(searchResult);
        setCurrentSearchText(searchText);
        setCheckShortMovies(checkShortMovies);
    }

    useEffect(() => {
        setFindedMoviesList(savedList);
    }, [savedList]);

    useEffect(() => {
        handleSearch(currentSearchText);
    },[savedList])

    return (
        <main>
            <SearchForm
                searchText={currentSearchText}
                handleSearch={handleSearch}
                handleCheckShortMovies={handleCheckShortMovies}
                checkShortMovies={checkShortMovies}
                listFound={savedList.length > 0} 
            />
            {!isLoading ? <MoviesCardList
                moviesList={formatMoviesLoacalToApi(findedMoviesList, baseUrl)}
                savedList={savedList}
                baseUrl={baseUrl}
                onSaveClick={onSaveClick}
                onDeleteClick={onDeleteClick}
                isSavedMoviesRoute={isSavedMoviesRoute}
            /> : <Preloader />}
        </main>
    );
}

export default SavedMovies;
