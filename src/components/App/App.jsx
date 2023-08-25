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

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from "../../utils/ProtectedRoute";


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
  const [currentUser, setCurrentUser] = useState({});
  const [signupError, setSignupErrorError] = useState('');
  const [loginError, setLoginErrorError] = useState('');
  const [editModeError, setEditModeError] = useState('');
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
        handleLogin( email, password);
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

  function handleSignOut() {
    setCurrentUser({});
    setIsLoggedIn(false);
    localStorage.clear();
    mainApi.setHeaderToken('');
    navigate('/', { replace: true });
  }

  function handleEditProfile(name, email) {
    mainApi
      .setCurrentUser(name, email)
      .then(res => {
        setCurrentUser({ ...res.data });
      })
      .catch(err => {
        setEditModeError(err);
        console.log(err);
      })
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) mainApi.setHeaderToken(jwt);
    console.log('jwt', jwt);
  }, [])

  //если есть токен когда просто заходим на страницу вписываем юзера в стейт 
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi
        .getCurrentUser()
        .then(res => {
          console.log('get current user navigate', res);
          setIsLoggedIn(true);
          setCurrentUser(res.data);

        })
        .catch(err => console.log(err))
    }
  }, [navigate]);

  // получение информации о пользователе при входе
  useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getCurrentUser()
        .then(res => {
          setCurrentUser(res.data)
        })
        .catch(err => console.log(err))
    }
  }, [isLoggedIn]);

  useEffect(() => {
    console.log('currentUser', currentUser);
  }, [currentUser])


  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="app">

        <Routes>
          {['/', '/movies', '/saved-movies', '/profile']
            .map((path, index) => <Route path={path} key={index} element={<Header isLoggedIn={isLoggedIn}/>} />)}
        </Routes>

        <Routes>

          <Route exact path="/" element={<Main />} />

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


          {/* <Route
            exect path="/movies"
            element={
              <ProtectedRoute
                element={
                  <main>
                    <SearchForm />
                    {!isLoading ? <MoviesCardList /> : <Preloader />}
                  </main>
                }
                isLoggedIn={isLoggedIn}
              />
            }
          /> */}

          <Route path="/profile" element={<Profile onSignOut={handleSignOut} onEdit={handleEditProfile} editModeError={editModeError} />} />

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


