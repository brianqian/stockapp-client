import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
`;

const NavBar = () => {
  return (
    <Container>
      <Link to="/tracker">Tracker</Link>
      <Link to="/scan">Scan</Link>
      <Link to="/sectors">Sectors</Link>
    </Container>
  );
};

export default NavBar;
