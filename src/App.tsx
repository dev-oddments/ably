import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';

import { LoginPage } from '@pages';

export default function App(): ReactElement {
  return (
    <>
      <Switch>
        <Route exact path="/" component={LoginPage} />
      </Switch>
    </>
  );
}
