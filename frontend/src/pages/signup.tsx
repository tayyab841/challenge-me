import styled from 'styled-components';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Layout from '../layout';
import { useAppDispatch } from '../hooks';
import userSignup from '../services/userSignup';
import { loginSuccess } from '../store/reducers/user';

const Container = styled.div`
display: flex;
flex-wrap: wrap;
margin-top: 120px;
align-content: center;
flex-direction: column;
justify-content: center;
.card { width: 500px; }
.card-body button { width: 300px; }`;

export default function Signup(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSingup = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      email: { value: string };
      password: { value: string };
    };
    setLoading(true);
    userSignup({
      name: target.name.value,
      email: target.email.value,
      password: target.password.value
    })
      .then(function (response) {
        localStorage.setItem("user_id", response.userId || '');
        localStorage.setItem("user_token", response.token || '');
        localStorage.setItem("user_name", response.userName || '');
        dispatch(loginSuccess({ userName: response.userName, userId: response.userId, token: response.token }));
        navigate('/');
      })
      .catch(function (error) {
        setError(error.response.data)
        setLoading(false);
      });
  }

  return (
    <Layout>
      <Container>
        <h1 className="text-center my-4 text-white">Sign Up</h1>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSingup}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input required placeholder='Name' type="text" className="form-control" name="name" />
              </div>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input required placeholder='Email' type="email" className="form-control" name="email" />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input required placeholder='Password' type="password" className="form-control" name="password" />
                <div className="form-text">
                  8-16 characters, at least one uppercase letter, one lowercase letter, one number and one special character
                </div>
              </div>
              <div className="w-100 d-flex justify-content-center form-text text-danger">
                {error}
              </div>
              <div className='w-100 d-flex justify-content-center my-4'>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Loading...' : 'Sign Up'}
                </button>
              </div>
            </form>
            <div>
              <hr />
            </div>
            <div className='w-100 d-flex justify-content-center my-4'>
              <button className="btn btn-secondary">
                <Link to={'/login'} className='text-decoration-none text-white'>Log in</Link>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
}