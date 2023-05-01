import React, { useEffect } from 'react';

import Header from './header';
// import Footer from './footer';
import styled from 'styled-components';
import { useAppDispatch } from '../hooks';
import { loginSuccess } from '../store/reducers/user';
import background from '../assets/images/background.jpg';

const Container = styled.div`
min-height: 100vh;
background-size: cover;
background-image: url(${background});
.content {
  margin: 50px;
  height: 82vh;
  display: flex;
  overflow-y: auto;
  border-radius: 20px;
  justify-content: center;
  background-color: rgb(255,255,255,0.1);
  ::-webkit-scrollbar { width: 10px; }
  ::-webkit-scrollbar-track {
    background: #93715D;
    border-radius: 25px;
  } 
  ::-webkit-scrollbar-thumb {
    background: #FEF6D1;
    border-radius: 15px;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  }
}`;

interface Props {
  children: JSX.Element | JSX.Element[];
}

export default function Layout(props: Props): JSX.Element {
  const { children } = props;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const userName = localStorage.getItem("user_name");
    const userToken = localStorage.getItem("user_token");
    if (userToken && userName && userId) {
      dispatch(loginSuccess({ userName: userName, userId: userId, token: userToken }));
    }
  }, [dispatch]);

  return (
    <Container>
      <Header />
      <div className="content">
        {children}
      </div>
      {/* <Footer /> */}
    </Container>
  )
}