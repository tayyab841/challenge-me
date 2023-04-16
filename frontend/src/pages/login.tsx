import React from 'react';
import axios from 'axios';
import { loginInit, loginSuccess, loginFail } from '../store/reducers/user';
import Layout from '../layout';
import { useAppDispatch, useAppSelector } from '../hooks';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const Container = styled.div`
margin-top: 120px;
margin-bottom: 120px;
display: flex;
flex-direction: column;
flex-wrap: wrap;
align-content: center;
justify-content: center;
.card { width: 500px; }
.card-body button {
  width: 300px;
}`;

export default function Login(): JSX.Element {
  const dispatch = useAppDispatch();
  const loginState = useAppSelector(state => state.user);
  const navigate = useNavigate();

  const handleLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    dispatch(loginInit());
    axios.post(process.env.REACT_APP_API_URL + '/login', {
      email: target.email.value,
      password: target.password.value
    })
      .then(function (response) {
        dispatch(loginSuccess(response.data.user_name));
        localStorage.setItem("user_token", response.data.token);
        navigate('/');
      })
      .catch(function (error) {
        dispatch(loginFail(error.response.data));
      });
  }

  return (
    <Layout>
      <Container>
        <h1 className="text-center my-4 text-white">Login Page</h1>
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