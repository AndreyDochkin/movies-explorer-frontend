import React, { useEffect, useState, useHistory } from "react";
import { Route, Navigate, Routes, useNavigate, useLocation } from 'react-router-dom';

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
import SavedMovies from "../SavedMovies/SavedMovies";
import Movies from "../Movies/Movies";

import MoviesApi from "../../utils/MoviesApi";
import MainApi from "../../utils/MainApi";

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from "../../utils/ProtectedRoute";


const moviesApiMain = new MoviesApi({
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
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
  },
})

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  // const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const [signupError, setSignupErrorError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [editModeError, setEditModeError] = useState('');
  const [isLoading, setIsLoading] = useState(true); //useState((localStorage.getItem("jwt") ? true : false));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [moviesList, setMoviesList] = useState([]);
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [isSavedMoviesRoute, setIsSavedMoviesRoute] = useState(false);

  useEffect(() => {
    setIsSavedMoviesRoute(location.pathname === '/saved-movies');
  }, [location]);


  useEffect(() => {
    if (!isLoggedIn) return;
    setIsLoading(true);
    moviesApiMain.getMovies()
      .then((movies) => {
        setMoviesList(movies);

      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => { setIsLoading(false); });
  }, [isLoggedIn]);


  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi.setHeaderToken(jwt);
    }
    console.log('jwt', jwt);
  }, []);

  //если есть токен когда просто заходим на страницу вписываем юзера в стейт 
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setIsLoading(true);
      mainApi
        .getCurrentUser()
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentUser(res.data);
          // navigate('/', { replace: true });
        })
        .catch(err => console.log(err))
        .finally(() => { setIsLoading(false) });
    }
  }, [navigate]);

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
          // history.push('/movies');
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
      })
      .catch(err => {
        setEditModeError(err);
        console.log(err);
      })
      .finally(() => { setIsLoading(false) });
  }

  function handleSaveMovie(movie) {
    setIsLoading(true);

    if (savedMoviesList.some(m => m.movieId === movie.id || m.movieId === movie.movieId)) return;

    console.log('movie', movie);
    const thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`;
    const image = `https://api.nomoreparties.co${movie.image.url}`;
    const movieForSave = {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: image,
      trailerLink: movie.trailerLink,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: thumbnail,
      movieId: movie.id,
    }

    mainApi
      .addMovie(movieForSave)
      .then((newMovie) => {
        console.log('newMovie', newMovie);
        setSavedMoviesList([newMovie.data, ...savedMoviesList]);
      })
      // .then(newMovie => setSavedMoviesList([newMovie, ...savedMoviesList]))
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
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

  useEffect(() => {
    if (isLoggedIn && currentUser) {
      setIsLoading(true);
      mainApi
        .getMovies()
        .then(res => {
          console.log('mainApi getMovies', res.data);
          const UserMoviesList = res.data.filter(m => m.owner === currentUser._id);
          setSavedMoviesList(UserMoviesList);
        })
        .catch(err => console.log(err))
        .finally(() => { setIsLoading(false); });
    }
  }, [currentUser, isLoggedIn]);

  console.log('App savedMoviesList', savedMoviesList);

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="app">

        <Routes>
          {['/', '/movies', '/saved-movies', '/profile']
            .map((path, index) => <Route path={path} key={index} element={<Header isLoggedIn={isLoggedIn} />} />)}
        </Routes>

        <Routes>

          <Route exact path="/" element={<Main />} />

          <Route path="/movies" element={
            <Movies
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              baseUrl={'https://api.nomoreparties.co'}
              moviesList={moviesList}
              savedList={savedMoviesList}
              onSaveClick={handleSaveMovie}
              onDeleteClick={handleDeleteMovie}
              isSavedMoviesRoute={isSavedMoviesRoute} />
          } />

          <Route path="/saved-movies" element={
            <Movies
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              baseUrl={'https://api.nomoreparties.co'}
              moviesList={savedMoviesList}
              savedList={savedMoviesList}
              onSaveClick={handleSaveMovie}
              onDeleteClick={handleDeleteMovie}
              isSavedMoviesRoute={isSavedMoviesRoute} />
          } />

          <Route path="/profile" element={<Profile onSignOut={handleSignOut}
            onEdit={handleEditProfile}
            editModeError={editModeError} />} />

          <Route path="/sign-up" element={<Register registrationUser={handleUserSignUp} signupError={signupError} />} />

          <Route path="/sign-in" element={<Login loginUser={handleLogin} loginError={loginError} />} />

          <Route path="*" element={<NotFound />} />

        </Routes>

        <Routes>
          {['/movies', '/saved-movies', '/',]
            .map((path, index) => <Route path={path} key={index} element={<Footer />} />)}
        </Routes>

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;


