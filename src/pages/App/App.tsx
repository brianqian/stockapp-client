import React, { useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Tracker from '../Tracker/Tracker';
import Profile from '../Profile/Profile';
import Scan from '../Scan/Scan';
import Sectors from '../Sectors/Sectors';
import NavBar from '../../components/NavBar/NavBar';

const Container = styled.div``;

const views = {
  tracker: {
    columns: [],
  },
  sectors: {
    columns: [],
  },
  profile: {
    columns: [],
  },
  scan: {
    columns: [],
  },

  inOrder: ['tracker', 'sectors', 'profile', 'scan'],
};

const App = () => {
  return (
    <Container>
      Main App
      <Switch>
        <Route path="/tracker">
          <Tracker />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/scan">
          <Scan />
        </Route>
        <Route path="/sectors">
          <Sectors />
        </Route>
      </Switch>
      <NavBar />
    </Container>
  );
};

export default App;
