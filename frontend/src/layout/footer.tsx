import React from "react";
import styled from "styled-components";
import twitter from "../assets/images/twitter.svg";
import facebook from "../assets/images/facebook.svg";
import instagram from "../assets/images/instagram.svg";

const Container = styled.div``;

export default function Footer(): JSX.Element {
  return (
    <Container className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
            Brand Name
          </a>
          <span className="mb-3 mb-md-0 text-muted">© 2023 Company, Inc</span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3"><a className="text-muted" href="https://twitter.com" target="_blank" rel="noreferrer"><img src={twitter} alt="twitter" /></a></li>
          <li className="ms-3"><a className="text-muted" href="https://instagram.com" target="_blank" rel="noreferrer"><img src={instagram} alt="twitter" /></a></li>
          <li className="ms-3"><a className="text-muted" href="https://facebook.com" target="_blank" rel="noreferrer"><img src={facebook} alt="facebook" /></a></li>
        </ul>
      </footer>
    </Container>
  );
}