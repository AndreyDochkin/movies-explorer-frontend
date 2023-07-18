import React, { useEffect, useState } from "react";
import { Route, Navigate, Routes, useNavigate } from 'react-router-dom';

import Header from '../Header/Header';
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import Footer from '../Footer/Footer';
import Portfolio from "../Portfolio/Portfolio";

function App() {
  return (
    <div className="app">

      <Header />
      <Promo />
      <AboutProject />
      <Techs />
      <Portfolio />
      <Footer />

    </div>
  );
}

export default App;
