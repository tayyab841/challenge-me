import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

import Layout from '../layout';
import userLogin from '../services/userLogin';
import { useAppDispatch, useAppSelector } from '../hooks';
import { loginInit, loginSuccess, loginFail, selectUser } from '../store/reducers/user';

const Container = styled.div`
display: flex;
flex-wrap: wrap;
margin-top: 120px;
align-content: center;
flex-direction: column;
justify-content: center;
.card { width: 500px; }
.card-body button { width: 300px; }`;

export default function Login(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loginState = useAppSelector(selectUser);

  const handleLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    dispatch(loginInit());
    userLogin({ email: target.email.value, password: target.password.value })
      .then((response) => {
        localStorage.setItem("user_id", response.userId || '');
        localStorage.setItem("user_token", response.token || '');
        localStorage.setItem("user_name", response.userName || '');
        dispatch(loginSuccess({ userName: response.userName, userId: response.userId, token: response.token }));
        navigate('/');
      })
      .catch((error) => {
        dispatch(loginFail(error.msg));
      });
  }

  return (
    <Layout>
      <Container>
        <h1 className="text-center my-4 text-white">Login</h1>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input required placeholder='Email' type="email" className="form-control" name="email" />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input required placeholder='Password' type="password" className="form-control" name="password" />
              </div>
              <div className="w-100 d-flex justify-content-center form-text text-danger">
                {loginState.error}
              </div>
              <div className='w-100 d-flex justify-content-center my-4'>
                <button type="submit" className="btn btn-primary" disabled={loginState.isLoading}>
                  {loginState.isLoading ? 'Loading...' : 'Login'}
                </button>
              </div>
            </form>
            <div>
              <hr />
            </div>
            <div className='w-100 d-flex justify-content-center my-4'>
              <button className="btn btn-secondary">
                <Link to={'/signup'} className='text-decoration-none text-white'>Sign Up</Link>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
}