import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

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
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/game' element={<Game />} />
        </Routes>
      </Router>
    </React.StrictMode>
  </Provider>
);
