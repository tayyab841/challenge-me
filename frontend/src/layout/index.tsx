import React, { useEffect } from 'react';
import Header from './header';
// import Footer from './footer';
import styled from 'styled-components';
import background from '../assets/images/background.jpg';
import { useAppDispatch } from '../hooks';
import { loginSuccess } from '../store/reducers/user';
import axios from "axios";

const Container = styled.div`
min-height: 100vh;
background-image: url(${background});`;

interface Props {
  children: JSX.Element | JSX.Element[];
}

export default function Layout(props: Props): JSX.Element {
  const { children } = props;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user_token = localStorage.getItem("user_token");
    if (user_token) {
      axios.post(process.env.REACT_APP_API_URL + '/decode', {
        token: user_token
      })
        .then(function (response) {
          if (response.data.user_name) {
            console.log("decoded user name", response.data)
            dispatch(loginSuccess(response.data.user_name));
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [dispatch]);

  return (
    <Container>
      <Header />
      {children}
      {/* <Footer /> */}
    </Container>
  )
}