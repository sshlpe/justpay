import React from 'react';
import ReactDOM from 'react-dom/client';
// ---------------- Components ------------ //
import Header from './routes/hd-ft/header';
import Footer from './routes/hd-ft/footer';
import Home from './routes/homePage/home';
import Admin from './routes/extras/admin';
import DiscountPage from './routes/benefits/benefits';
import Credits from './routes/extras/credits';

import Test from './routes/extras/test';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter, HashRouter ,Routes, Route } from "react-router-dom";

import "./styles/index.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  {/*  basename={process.env.PUBLIC_URL} */}
    <BrowserRouter>
      <Header/>
      <div className="container-h-0">
        <Routes>
          <Route path="" element={<Home/>}/>
          <Route path="benefits/:selected" element={<DiscountPage/>} />
          <Route path="admin" element={<Admin/>} />
          <Route path="credits" element={<Credits/>} />
          <Route path="test" element={<Test/>} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
