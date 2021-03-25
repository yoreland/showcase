
import React from 'react';
import Container from '@material-ui/core/Container';
import Nav from './nav';
import CardList from './card-list';
import {Box} from '@material-ui/core';

import './index.scss';
import theme from 'theme';

export default function App() {
  return (
    <>
      <Nav />
      <Container className="bg-white nav-gap">
        <CardList />
      </Container>
    </>
  );
}