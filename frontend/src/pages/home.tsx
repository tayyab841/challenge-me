import React from 'react';
import styled from 'styled-components';

import Layout from '../layout';
import { useAppSelector } from '../hooks';
import GameTable from '../components/gameTable';
import StatsTable from '../components/StatsTable';
import PlayerTable from '../components/playerTable';
import { selectUser } from '../store/reducers/user';

const Container = styled.div`
color: white;
display: flex;
flex-wrap: wrap;
padding: 30px 50px;
align-content: center;
flex-direction: column;
justify-content: center;`;

export default function Home(): JSX.Element {
  const loggedInUser = useAppSelector(selectUser).user;

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
                <GameTable />
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
