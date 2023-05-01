import React from "react";
import styled from "styled-components";

const Container = styled.div`
width: 500px;
height: 500px;
display: flex;
flex-wrap: wrap;
margin-top: 20px;
align-content: center;
justify-content: center;
border: white 2px solid;
`;

export default function Board(): JSX.Element {
  return (
    <Container>
      <h1>Game board here</h1>
    </Container>
  );
}