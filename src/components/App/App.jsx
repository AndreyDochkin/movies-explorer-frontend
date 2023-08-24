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
  // baseUrl: 'http://api.moviematchup.nomoreparties.sbs',
  baseUrl: 'http://localhost:4000',
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${localStorage.getItem('token')}`,
  },
})

function App() {
  const navigate = useNavigate();
  const [signupError, setSignupErrorError] = useState('');
  const [loginError, setLoginErrorError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    moviesApi.getMovies()
      .then((movies) => {
        // console.log(movies);
      })
      .catch((err) => {

        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [])

  function handleUserSignUp(email, password, name) {
    setIsLoading(true);
    mainApi.registerUser(email, password, name)
      .then((res) => {
        handleLogin({ email, password });
      })
      .catch((err) => {
        setSignupErrorError(err);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLogin(email, password) {
    setIsLoading(true);
    mainApi
      .loginUser(email, password)
      .then(data => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setIsLoggedIn(true);
          navigate('/movies', { replace: true });
        }
      })
      .catch((err) => {
        setLoginErrorError(err);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });

    // setLoginError(false)
    // localStorage.setItem("jwt", data.token);
    // api.setHeaderToken(data.token); //! pass toket to header for api request
    // setToken(data.token);
    // setIsLoggedIn(true);
    // navigate('/', { replace: true });

  }


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

        <Route path="/sign-up" element={<Register registrationUser={handleUserSignUp} signupError={signupError} />} />

        <Route path="/sign-in" element={<Login loginUser={handleLogin} loginError={loginError} />} />

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


