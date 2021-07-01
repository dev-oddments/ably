import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { render } from '@parse/test-utils';

import App from './App';

function renderApp({ path }) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe('App', () => {
  context('/ path', () => {
    it('정상적으로 렌더링된다', () => {
      const { container } = renderApp({ path: '/' });

      expect(container).toHaveTextContent('로그인');
    });
  });
});
