import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { postLoginApi } from '@repository/baseRepository';

import { render } from '@parse/test-utils';

import { MODALS, EMAIL_EXIST } from '@utils/constants';
import App from './App';

function renderApp({ path }) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe('App', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) =>
      selector({
        modal: {
          [MODALS.ALERT_MODAL]: false,
          content: '',
        },
        auth: {
          isLogin: false,
          email: '',
          lastConnectedAt: '',
          name: '',
          profileImage: '',
        },
        password: {
          route: EMAIL_EXIST,
          issueToken: '',
          confirmToken: '',
          remainTime: 0,
          timerId: '',
        },
      }),
    );
  });

  context('/ path', () => {
    it('정상적으로 렌더링된다', () => {
      const { container } = renderApp({ path: '/' });

      expect(container).toHaveTextContent('로그인');
    });
  });

  context('/reset-password path', () => {
    it('정상적으로 렌더링된다', () => {
      const { container } = renderApp({ path: '/reset-password' });

      expect(container).toHaveTextContent('다음');
    });
  });

  context('/my-info path', () => {
    it('정상적으로 렌더링된다', async () => {
      try {
        const {
          data: { accessToken },
        } = await postLoginApi({
          param: {
            email: 'ably933@dummy.com',
            password: '!abc321#$',
          },
        });

        localStorage.setItem('accessToken', accessToken);

        const { container } = renderApp({ path: '/my-info' });

        expect(container).toHaveTextContent('로그아웃');
      } catch (error) {
        console.error(error);
      }
    });
  });
});
