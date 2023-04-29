import styled from 'styled-components';
import React, { useEffect, useState } from 'react';

import Layout from '../layout';
import { Player } from '../common/types';
import { useAppSelector } from '../hooks';
import StatsTable from '../components/StatsTable';
import PlayerTable from '../components/playerTable';
import getPlayerStats from '../services/getPlayerStats';

const Container = styled.div`
color: white;
display: flex;
flex-wrap: wrap;
padding: 30px 50px;
align-content: center;
flex-direction: column;
justify-content: center;`;

export default function Home(): JSX.Element {
  const loggedInUser = useAppSelector((state) => state.user);
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    getPlayerStats({ token: localStorage.getItem('user_token') || '' })
      .then((response) => {
        setPlayers(response.players || []);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, []);

  return (
    <Layout>
      <Container>
        <h1 className='text-center'>Welcome To Challenge Me</h1>
        <h3 className='mb-4 text-center'>A Multiplayer Gaming Universe</h3>
        {loggedInUser.user.userId && (
          <div className='row w-100 gx-5'>
            <div className='col col-lg-4'>
              <StatsTable players={players} />
            </div>
            <div className='d-none d-lg-block col-lg-4'></div>
            <div className='col col-lg-4'>
              <PlayerTable players={players.filter((player) => player._id !== localStorage.getItem('user_id'))} />
            </div>
          </div>
        )}
      </Container>
    </Layout>
  );
}
