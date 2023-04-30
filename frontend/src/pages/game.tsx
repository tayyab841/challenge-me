import styled from 'styled-components';
import React from 'react';

import Layout from '../layout';
import { useLocation } from 'react-router-dom';
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
  const playerOne = location.state.player_one;
  const playerTwo = location.state.player_two;
  return (
    <Layout>
      <Container>
        <h1 className='text-center'>Its game time</h1>
        <h3>Player One: {playerOne.name}</h3>
        <h3>Player Two: {playerTwo.name}</h3>
        <Board />
      </Container>
    </Layout>
  );
}
