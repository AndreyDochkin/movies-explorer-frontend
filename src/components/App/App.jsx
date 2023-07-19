import React, { useEffect, useState } from "react";
import { Route, Navigate, Routes, useNavigate } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';


function App() {
  return (
    <div className="app">
      <Header />
      {/* <Main /> */}
      <SearchForm />
      <Footer />
    </div>
  );
}

export default App;
