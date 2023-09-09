import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import { filterBySearchText, filterByShortDuration } from '../../utils/utils';

import MoviesApi from '../../utils/MoviesApi';

const moviesApi = new MoviesApi({
    baseUrl: 'https://api.nomoreparties.co',
    headers: {
        "Content-Type": "application/json",
    },
});

function Movies({ isLoading, setIsLoading, baseUrl, savedList, onSaveClick, onDeleteClick, isSavedMoviesRoute }) {
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

    const [mainMoviesList, setMainMoviesList] = useState([]);
    const [shortList, setShortList] = useState([]);

    function handleSearch(searchText, check) {
        localStorage.setItem(`${currentUser.email}:searchText`, searchText);
        localStorage.setItem(`${currentUser.email}:checkShortMovies`, check);
        setCurrentSearchText(searchText);
        setCheckShortMovies(check);


        // if (mainMoviesList.length === 0) {

        setIsLoading(true);
        moviesApi.getMovies()
            .then((movies) => {
                setMainMoviesList(movies);

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
        // } else {
        //     const filteredMovies = searchText ? filterBySearchText(mainMoviesList, searchText) : mainMoviesList;
        //     const searchResult = check ? filterByShortDuration(filteredMovies) : filteredMovies;

        //     setFindedMoviesList(searchResult);
        //     localStorage.setItem(`${currentUser.email}:movies`, JSON.stringify(searchResult));
        // }

    }

    function handleCheckShortMovies() {
        setCheckShortMovies(!checkShortMovies);
    }


    useEffect(() => {
        if(checkShortMovies){
            const short = filterByShortDuration(findedMoviesList);
            setShortList(short);
        }
        
        localStorage.setItem(`${currentUser.email}:checkShortMovies`, checkShortMovies);

    }, [checkShortMovies]);

    useEffect(() => {

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
            /> : <Preloader />}
        </main>
    );
}

export default Movies;
