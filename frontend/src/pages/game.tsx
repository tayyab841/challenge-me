import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import Layout from '../layout';
import Board from '../components/board';

const Container = styled.div`
color: white;
display: flex;
flex-wrap: wrap;
padding: 30px 50px;
align-content: center;
flex-direction: column;
justify-content: center;`;

export default function Game(): JSX.Element {
  const location = useLocation();
  const playerOne = location.state.playerOne;
  const playerTwo = location.state.playerTwo;

  return (
    <Layout>
      <Container>
        <h1 className='text-center'>Its game time</h1>
        <h3>{playerOne.name} VS {playerTwo.name}</h3>
        <Board />
      </Container>
    </Layout>
  );
}
