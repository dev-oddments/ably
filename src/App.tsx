import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';

import { LoginPage } from '@pages';
import GlobalStyles from './style/globalStyles';

export default function App(): ReactElement {
  return (
    <>
      <GlobalStyles />
      <Switch>
        <Route exact path="/" component={LoginPage} />
      </Switch>
    </>
  );
}
