import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import Home from './pages/home';
import { store } from './store';
import Login from './pages/login';
import Signup from './pages/signup';
import './assets/stylesheets/index.css';
import Game from './pages/game';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/game' element={<Game />} />
        </Routes>
      </Router>
    </React.StrictMode>
  </Provider>
);
