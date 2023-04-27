import React from 'react';
import Layout from '../layout';
import styled from 'styled-components';
import StatsTable from '../components/StatsTable';
import PlayerTable from '../components/playerTable';
import { useAppSelector } from '../hooks';

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
  return (
    <Layout>
      <Container>
        <h1 className='text-center'>Welcome To Challenge Me</h1>
        <h3 className='mb-4 text-center'>A Multiplayer Chess</h3>
        {loggedInUser.user && (
          <div className='row w-100 gx-5'>
            <div className='col col-lg-4'>
              <StatsTable />
            </div>
            <div className='d-none d-lg-block col-lg-4'></div>
            <div className='col col-lg-4'>
              <PlayerTable />
            </div>
          </div>
        )}
      </Container>
    </Layout>
  );
}
