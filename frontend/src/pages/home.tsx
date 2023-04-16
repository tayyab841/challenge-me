import React from 'react';
import Layout from '../layout';
import styled from 'styled-components';

const Container = styled.div`
margin-top: 120px;
margin-top: 120px;
margin-bottom: 120px;
display: flex;
flex-direction: column;
flex-wrap: wrap;
align-content: center;
justify-content: center;`;

export default function Home(): JSX.Element {
  return (
    <Layout>
      <Container>
        <h1 className='text-white my-4 text-center'>Welcome To MERN Boiler Plate</h1>
      </Container>
    </Layout>
  );
}
