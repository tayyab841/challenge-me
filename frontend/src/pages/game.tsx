import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

import Layout from '../layout';
import Board from '../components/board';
import { toast } from 'react-toastify';
import { useAppSelector } from '../hooks';
import { selectUser } from '../store/reducers/user';
import endGame from '../services/endGame';

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
  const navigate = useNavigate();
  const gameId = location.state.id;
  const playerOne = location.state.playerOne;
  const playerTwo = location.state.playerTwo;
  const loggedInUser = useAppSelector(selectUser).user;

  const handleGameEnd = (winnerId: string, losserId: string, drawn: boolean = false): void => {
    endGame({ token: loggedInUser.token, gameId, winnerId, losserId, drawn })
      .then((response) => {
        toast.success(response.msg);
        navigate('/stats');
      })
      .catch((error) => {
        toast.error(error.msg);
      });
  }

  return (
    <Layout>
      <Container>
        <h1 className='text-center'>Its game time</h1>
        <h3 className='text-center'>{playerOne.name} VS {playerTwo.name}</h3>
        <div className='d-flex'>
          <Board />
          <div className='d-flex flex-column ms-5 my-auto'>
            <h3 className='text-center'>Triggers</h3>
            <button
              onClick={() => handleGameEnd(playerOne.id, playerTwo.id)}
              className='btn btn-outline-primary text-white border-white mt-3'
            >
              {playerOne.name} Wins
            </button>
            <button
              onClick={() => handleGameEnd(playerTwo.id, playerOne.id)}
              className='btn btn-outline-primary text-white border-white mt-3'
            >
              {playerTwo.name} Wins
            </button>
            <button
              onClick={() => handleGameEnd(playerOne.id, playerTwo.id, true)}
              className='btn btn-outline-primary text-white border-white mt-3'
            >
              Drawn
            </button>
          </div>
        </div>
      </Container>
    </Layout>
  );
}
