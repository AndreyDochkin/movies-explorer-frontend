import React, { useEffect, useState } from "react";
import { Route, Navigate, Routes, useNavigate, useLocation } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import Preloader from "../Preloader/Preloader";
import Movies from "../Movies/Movies";

import MoviesApi from "../../utils/MoviesApi";
import MainApi from "../../utils/MainApi";

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from "../../utils/ProtectedRoute";
import SavedMovies from "../SavedMovies/SavedMovies";

import { BASE_URL, BASE_URL_API_MOVIES } from "../../utils/constants";

const mainApi = new MainApi({
  // baseUrl: 'http://api.moviematchup.nomoreparties.sbs',
  // baseUrl: 'http://localhost:4000',
  baseUrl: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
  },
})

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState({});
  const [signupError, setSignupErrorError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [editModeError, setEditModeError] = useState('');
  const [editPass, setEditPass] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isBooted, setIsBooted] = useState(false); // надо дождаться проверки логина и уже потом грузить все остальные компоненты
  const [moviesList, setMoviesList] = useState([]);
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [isSavedMoviesRoute, setIsSavedMoviesRoute] = useState(false);

  useEffect(() => {
    setIsSavedMoviesRoute(location.pathname === '/saved-movies');
  }, [location]);

  //если есть токен когда просто заходим на страницу вписываем юзера в стейт 
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
      setIsBooted(true);
      setIsLoggedIn(false);
      return;
    }

    mainApi.setHeaderToken(jwt);
    setIsLoading(true);
    mainApi
      .getCurrentUser()
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res.data);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
        setIsBooted(true);
      });

  }, []);

  // получение информации о пользователе при входе
  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true);
      mainApi
        .getCurrentUser()
        .then(res => {
          setCurrentUser(res.data)
        })
        .catch(err => console.log(err))
        .finally(() => { setIsLoading(false) });
    }
  }, [isLoggedIn]);

  // получение списка сохраненных фильмов
  useEffect(() => {
    if (!isLoggedIn || !currentUser) {
      return;
    }
    setIsLoading(true);
    mainApi
      .getMovies()
      .then(res => {
        const UserMoviesList = res.data.filter(m => m.owner === currentUser._id);
        setSavedMoviesList(UserMoviesList);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, [isLoggedIn]);

  function handleUserSignUp(email, password, name) {
    setIsLoading(true);
    mainApi.registerUser(email, password, name)
      .then((res) => {
        handleLogin(email, password);
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
          mainApi.setHeaderToken(data.token);
          setIsLoggedIn(true);
          navigate('/movies');
        }
      })
      .catch((err) => {
        setLoginError(err);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSignOut() {
    setCurrentUser({});
    setIsLoggedIn(false);
    localStorage.clear();
    mainApi.setHeaderToken('');
    navigate('/', { replace: true });
  }

  function handleEditProfile(name, email) {
    setIsLoading(true);
    mainApi
      .setCurrentUser(name, email)
      .then(res => {
        setCurrentUser({ ...res.data });
        setEditPass(true)
      })
      .catch(err => {
        setEditPass(false)
        setEditModeError(err);
        console.log(err);
      })
      .finally(() => { setIsLoading(false) });
  }

  function handleSaveMovie(movie) {
    if (savedMoviesList.some(m => m.movieId === movie.id || m.movieId === movie.movieId)) return;

    const movieForSave = {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `${BASE_URL_API_MOVIES}${movie.image.url}`,
      trailerLink: movie.trailerLink,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: `${BASE_URL_API_MOVIES}${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
    }

    mainApi
      .addMovie(movieForSave)
      .then((newMovie) => setSavedMoviesList([newMovie.data, ...savedMoviesList]))
      .catch(err => console.log(err))
  }

  function handleDeleteMovie(movie) {
    if (!movie) return;
    const savedMovie = savedMoviesList.find(m => m.movieId === movie.id || m.movieId === movie.movieId);
    mainApi
      .deleteMovie(savedMovie._id)
      .then(() => {
        const list = savedMoviesList.filter(m => {
          return (movie.id === m.movieId || movie.movieId === m.movieId) ? false : true
        });
        setSavedMoviesList(list);
      })
      .catch(err => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {isBooted &&

        <div className="app">

          <Routes>
            {['/', '/movies', '/saved-movies', '/profile']
              .map((path, index) => <Route path={path} key={index} element={<Header isLoggedIn={isLoggedIn} />} />)}
          </Routes>

          <Routes>

            <Route exact path="/" element={<Main />} />

            <Route path="/movies"
              element={
                !isLoading ?
                  <ProtectedRoute
                    element={Movies}
                    isLoggedIn={isLoggedIn}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    baseUrl={BASE_URL_API_MOVIES}
                    savedList={savedMoviesList}
                    onSaveClick={handleSaveMovie}
                    onDeleteClick={handleDeleteMovie}
                    isSavedMoviesRoute={isSavedMoviesRoute} />
                  : <Preloader />
              } />

            <Route path="/saved-movies"
              element={
                !isLoading ?
                  <ProtectedRoute
                    element={SavedMovies}
                    isLoggedIn={isLoggedIn}
                    isLoading={isLoading}
                    baseUrl={BASE_URL_API_MOVIES}
                    savedList={savedMoviesList}
                    onSaveClick={handleSaveMovie}
                    onDeleteClick={handleDeleteMovie}
                    isSavedMoviesRoute={isSavedMoviesRoute}
                  /> : <Preloader />
              } />

            <Route path="/profile"
              element={
                  <ProtectedRoute
                    element={Profile}
                    isLoggedIn={isLoggedIn}
                    isLoading={isLoading}
                    onSignOut={handleSignOut}
                    onEdit={handleEditProfile}
                    editModeError={editModeError} 
                    editPass={editPass}
                    setEditPass={setEditPass}/>
              } />

            <Route path="/sign-up" element={
              isLoggedIn ? <Navigate to="/movies" /> :
                <Register registrationUser={handleUserSignUp} signupError={signupError} />} />

            <Route path="/sign-in" element={
              isLoggedIn ? <Navigate to="/movies" /> :
                <Login loginUser={handleLogin} loginError={loginError} />} />

            <Route path="*" element={<NotFound />} />

          </Routes>

          <Routes>
            {['/movies', '/saved-movies', '/',]
              .map((path, index) => <Route path={path} key={index} element={<Footer />} />)}
          </Routes>

        </div>
      }

    </CurrentUserContext.Provider>
  );
}

export default App;


