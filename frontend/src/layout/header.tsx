import React from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { loginSuccess } from "../store/reducers/user";
import logo from "../assets/images/logo.png";

const Container = styled.nav`
padding-left: 50px;
padding-right: 50px;
.logo {
  height: 50px;
}`;

export default function Header(): JSX.Element {
  const loginState = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_name");
    dispatch(loginSuccess(''));
  }

  return (
    <Container className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link to={'/'} className="navbar-brand">
          <img className="logo" src={logo} alt="Challenge Me" />
        </Link>
        <ul className="navbar-nav">
          {loginState.isLoading || loginState.user ? (
            <li className="nav-item">
              {loginState.user ? (
                <React.Fragment>
                  <span className="navbar-text me-2">Signed in as: <b>{loginState.user}</b></span>
                  <button onClick={handleLogout} className="btn btn-outline-primary me-2" type="button">Logout</button>
                </React.Fragment>
              ) : (<span className="navbar-text text-warning">Loading ...</span>)}
            </li>
          ) : (
            <React.Fragment>
              <li className="nav-item">
                <Link to={'/login'} className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <Link to={'/signup'} className="nav-link">Sign Up</Link>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </Container>
  );
};
