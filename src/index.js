import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './routes/home';
import Dsc from './routes/discounts';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/dis/:selected" element={<Dsc/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
