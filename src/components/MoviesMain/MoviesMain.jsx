import React from 'react'
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';

function MoviesMain(props) {
    return (
        <main>
            <SearchForm />
            {!props.isLoading ? <MoviesCardList /> : <Preloader />}
        </main>
    )
}

export default MoviesMain