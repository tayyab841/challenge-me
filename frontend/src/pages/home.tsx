import styled from 'styled-components';
import React, { useEffect, useState } from 'react';

import Layout from '../layout';
import { Challenge } from '../common/types';
import { useAppDispatch, useAppSelector } from '../hooks';
import StatsTable from '../components/StatsTable';
import PlayerTable from '../components/playerTable';
import getChallenges from '../services/getChallenges';
import ChallengeTable from '../components/challengeTable';
import getPlayers from '../services/getPlayers';

const Container = styled.div`
color: white;
display: flex;
flex-wrap: wrap;
padding: 30px 50px;
align-content: center;
flex-direction: column;
justify-content: center;`;

interface Player {
  id: string,
  name: string;
  onlineStatus: string;
  challengeStatus: string;
}

export default function Home(): JSX.Element {
  const dispatch = useAppDispatch();
  const [players, setPlayers] = useState<Player[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const loggedInUser = useAppSelector((state) => state.user.user);

  useEffect(() => {
    if (loggedInUser.token) {
      getChallenges({ token: loggedInUser.token })
        .then((response) => {
          setChallenges(response.challengs || []);
        })
        .catch((error) => {
          console.log(error);
        });

      getPlayers({ token: loggedInUser.token })
        .then((response) => {
          setPlayers(response.players || []);
        })
        .catch(error => {
          console.log(error);
        })
    }
  }, [dispatch, loggedInUser]);

  return (
    <Layout>
      <Container>
        <h1 className='text-center'>Welcome To Challenge Me</h1>
        <h3 className='mb-4 text-center'>A Multiplayer Gaming Universe</h3>
        {loggedInUser.userId ? (
          <React.Fragment>
            <div className='row w-100'>
              <div className='col col-lg-4'>
                <StatsTable />
              </div>
              <div className='d-none d-lg-block col-lg-4'></div>
              <div className='col col-lg-4'>
                <PlayerTable />
              </div>
            </div>
            <div className='row w-100'>
              <div className='col col-lg-4'>
                <ChallengeTable challenges={challenges} />
              </div>
            </div>
          </React.Fragment>
        ) : (
          <h3 className='text-center'>Login/Singup to get started!</h3>
        )}
      </Container>
    </Layout>
  );
}
