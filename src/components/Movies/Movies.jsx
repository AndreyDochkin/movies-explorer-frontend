import React, { useState, useEffect, useContext } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import { filterBySearchText, filterByShortDuration } from '../../utils/utils';

import MoviesApi from '../../utils/MoviesApi';

import { BASE_URL, BASE_URL_API_MOVIES } from '../../utils/constants';

const moviesApi = new MoviesApi({
    baseUrl: BASE_URL_API_MOVIES,
    headers: {
        "Content-Type": "application/json",
    },
});

function Movies({ isLoading, setIsLoading, baseUrl, savedList, onSaveClick, onDeleteClick, isSavedMoviesRoute }) {
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

    const [mainList, setMainList] = useState(
        JSON.parse(localStorage.getItem(`${currentUser.email}:mainList`)) || []
    );

    const [shortList, setShortList] = useState([]);

    function handleSearch(searchText, check) {
        localStorage.setItem(`${currentUser.email}:searchText`, searchText);
        localStorage.setItem(`${currentUser.email}:checkShortMovies`, check);
        setCurrentSearchText(searchText);
        setCheckShortMovies(check);


        if (mainList.length === 0) {

            setIsLoading(true);
            moviesApi.getMovies()
                .then((movies) => {
                    setMainList(movies);
                    localStorage.setItem(`${currentUser.email}:mainList`, JSON.stringify(movies));

                    const filteredMovies = searchText ? filterBySearchText(movies, searchText) : movies;
                    const searchResult = check ? filterByShortDuration(filteredMovies) : filteredMovies;

                    setFindedMoviesList(searchResult);
                    localStorage.setItem(`${currentUser.email}:movies`, JSON.stringify(searchResult));
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            const filteredMovies = searchText ? filterBySearchText(mainList, searchText) : mainList;
            const searchResult = check ? filterByShortDuration(filteredMovies) : filteredMovies;

            setFindedMoviesList(searchResult);
            localStorage.setItem(`${currentUser.email}:movies`, JSON.stringify(searchResult));
        }

    }

    function handleCheckShortMovies() {
        setCheckShortMovies(!checkShortMovies);
    }


    useEffect(() => {
        if (checkShortMovies) {
            const short = filterByShortDuration(findedMoviesList);
            setShortList(short);
        }

        localStorage.setItem(`${currentUser.email}:checkShortMovies`, checkShortMovies);

    }, [checkShortMovies]);

    useEffect(() => {

        if (localStorage.getItem(`${currentUser.email}:mainList`)) {
            setMainList(JSON.parse(localStorage.getItem(`${currentUser.email}:mainList`)));
        }

        if (localStorage.getItem(`${currentUser.email}:movies`)) {
            setFindedMoviesList(JSON.parse(localStorage.getItem(`${currentUser.email}:movies`)));
        }

        if (localStorage.getItem(`${currentUser.email}:searchText`)) {
            setCurrentSearchText(localStorage.getItem(`${currentUser.email}:searchText`));
        }

        setCheckShortMovies(localStorage.getItem(`${currentUser.email}:checkShortMovies`) === 'true');

    }, [currentUser]);

    return (
        <main>
            <SearchForm
                searchText={currentSearchText}
                handleSearch={handleSearch}
                handleCheckShortMovies={handleCheckShortMovies}
                checkShortMovies={checkShortMovies}
                listFound={findedMoviesList}
            />
            {!isLoading ? <MoviesCardList
                moviesList={checkShortMovies ? shortList : findedMoviesList}
                savedList={savedList}
                baseUrl={baseUrl}
                onSaveClick={onSaveClick}
                onDeleteClick={onDeleteClick}
                isSavedMoviesRoute={isSavedMoviesRoute}
                isFirstRender={mainList.length > 0 ? false : true}
            /> : <Preloader />}
        </main>
    );
}

export default Movies;
