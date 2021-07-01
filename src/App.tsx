import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import { Modal } from '@organisms';
import { LoginPage } from '@pages';

import { MODALS } from '@utils/constants';

import GlobalStyles from '@style/globalStyles';

const Wrapper = styled.div`
  ${({ theme }) => theme.flexCol()}

  width: 100%;
  height: 100%;
`;

export default function App(): ReactElement {
  return (
    <>
      <GlobalStyles />
      <Switch>
        <Wrapper>
          <Route exact path="/" component={LoginPage} />
          <Modal modalName={MODALS.ALERT_MODAL} />
        </Wrapper>
      </Switch>
    </>
  );
}
