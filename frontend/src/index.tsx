import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import { store } from './store';
import Home from './pages/home';
import Game from './pages/game';
import Login from './pages/login';
import Games from './pages/games';
import Stats from './pages/stats';
import Signup from './pages/signup';
import Players from './pages/players';
import './assets/stylesheets/index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme="light" />
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/game' element={<Game />} />
          <Route path='/login' element={<Login />} />
          <Route path='/games' element={<Games />} />
          <Route path='/stats' element={<Stats />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/players' element={<Players />} />
        </Routes>
      </Router>
    </React.StrictMode>
  </Provider>
);
