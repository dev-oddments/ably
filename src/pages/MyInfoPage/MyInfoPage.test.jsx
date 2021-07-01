import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { render } from '@parse/test-utils';
import { MODALS, EMAIL_EXIST } from '@utils/constants';
import { MyInfoPage } from '@pages';

function renderMyInfoPage() {
  return render(<MyInfoPage />);
}

describe('MyInfoPage', () => {
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

  it('MyInfoPage 컴포넌트가 제대로 렌더링 되는지 확인한다', () => {
    const { container } = renderMyInfoPage();

    expect(container).toBeTruthy();
  });
});
