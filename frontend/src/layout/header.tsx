import React from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";

import logo from "../assets/images/logo.png";
import userLogout from "../services/userLogout";
import logoSM from "../assets/images/logo-sm.png";
import { useAppDispatch, useAppSelector } from "../hooks";
import { loginFail, loginInit, loginSuccess, selectUser } from "../store/reducers/user";

const Container = styled.nav`
padding-left: 50px;
padding-right: 50px;
.logo {
  height: 50px;
}
.nav-item {
  font-size: 24px;
}`;

export default function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const loginState = useAppSelector(selectUser);

  const handleLogout = () => {
    dispatch(loginInit());
    userLogout({ token: loginState.user.token })
      .then(() => {
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_token");
        dispatch(loginSuccess({ userName: '', userId: '', token: '' }));
      })
      .catch((err) => {
        dispatch(loginFail(err.msg))
      });
  }

  return (
    <Container className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link to={'/'} className="navbar-brand">
          <img className="d-none d-sm-block logo" src={logo} alt="Challenge Me" />
          <img className="d-block d-sm-none logo" src={logoSM} alt="Challenge Me" />
        </Link>
        <ul className="navbar-nav">
          {loginState.isLoading || loginState.user.userId ? (
            <li className="nav-item">
              {loginState.user.userId ? (
                <React.Fragment>
                  <span className="navbar-text me-2">Signed in as: <b>{loginState.user.userName}</b></span>
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
