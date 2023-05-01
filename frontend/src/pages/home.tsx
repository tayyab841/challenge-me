import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Layout from '../layout';
import { useAppSelector } from '../hooks';
import arrow from '../assets/images/arrow.png';
import { selectUser } from '../store/reducers/user';

const Container = styled.div`
color: white;
display: flex;
flex-wrap: wrap;
padding: 30px 50px;
align-content: center;
flex-direction: column;
justify-content: center;
.btn {
  width: 220px;
  height: 60px;
  font-size: 28px;
}
.arrow {
  height: 60px;
}`;

const LINKS = [
  { link: '/games', title: 'Your Games' },
  { link: '/players', title: 'Players' },
  { link: '/stats', title: 'Stats' }
];

export default function Home(): JSX.Element {
  const loggedInUser = useAppSelector(selectUser).user;

  return (
    <Layout>
      <Container>
        <h1 className='text-center'>Welcome To Challenge Me</h1>
        <h3 className='mb-4 text-center'>A Multiplayer Gaming Universe</h3>
        {loggedInUser.userId ? (
          <div className='mt-5 d-flex flex-column'>
            {LINKS.map((link) => (
              <div className='text-center'>
                <img className="arrow" src={arrow} alt={'arrow'} />
                <Link to={link.link}>
                  <button type="button" className="my-3 ms-3 btn btn-outline-primary text-white border-white">{link.title}</button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <h3 className='mt-5 text-center'>Login/Singup to get started!</h3>
        )}
      </Container>
    </Layout>
  );
}
