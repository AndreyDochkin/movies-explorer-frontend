import React, { useEffect, useState } from "react";
import { Route, Navigate, Routes, useNavigate } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import Preloader from "../Preloader/Preloader";

import MoviesApi from "../../utils/MoviesApi";
import MainApi from "../../utils/MainApi";


const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co',
  headers: {
      "Content-Type": "application/json",
  },
});

const mainApi = new MainApi({
  baseUrl: 'https://api.moviematchup.nomoreparties.sbs',
  headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem('token')}`,
  },
})


function App() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    moviesApi.getMovies()
      .then((movies) => {
        console.log(movies);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  },[])


  return (
    <div className="app">

      <Routes>
        {['/', '/movies', '/saved-movies', '/profile']
          .map((path, index) => <Route exect path={path} key={index} element={<Header />} />)}
      </Routes>

      <Routes>

        <Route exect path="/" element={<Main />} />

        <Route path="/movies" element={
          <main>
            <SearchForm />
            {!isLoading ? <MoviesCardList /> : <Preloader />}
          </main>

        } />
        <Route path="/saved-movies" element={
          <main>
            <SearchForm />
            {!isLoading ? <MoviesCardList /> : <Preloader />}
          </main>
        } />

        <Route path="/profile" element={<Profile />} />

        <Route path="sign-up" element={<Register />} />

        <Route path="sign-in" element={<Login />} />

        <Route path="*" element={<NotFound />} />

      </Routes>

      <Routes>
        {['/', '/movies', '/saved-movies']
          .map((path, index) => <Route exect path={path} key={index} element={<Footer />} />)}
      </Routes>

    </div>
  );
}

export default App;


