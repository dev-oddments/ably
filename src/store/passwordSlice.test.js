// import { getDefaultMiddleware } from '@reduxjs/toolkit';
// import configureStore from 'redux-mock-store';
import { EMAIL_EXIST, AUTH_CODE_CHECK } from '@utils/constants';
import passwordReducer, {
  setRoute,
  setIssueToken,
  setConfirmToken,
  setRemainTime,
  setTimerId,
  resetTime,
  startTime,
  //   checkEmailExist,
  //   checkAuthCodeRight,
  //   changePassword,
} from './passwordSlice';

// const middleWares = [...getDefaultMiddleware()];
// const mockStore = configureStore(middleWares);

describe('passwordReducer에서', () => {
  context('각각', () => {
    const initialState = {
      route: EMAIL_EXIST,
      issueToken: '',
      confirmToken: '',
      remainTime: 0,
      timerId: '',
    };

    it('setRoute 이용해 route 토글할 수 있다.', () => {
      const state = passwordReducer(
        initialState,
        setRoute({
          route: AUTH_CODE_CHECK,
        }),
      );

      expect(state.route).toEqual(AUTH_CODE_CHECK);
    });

    it('setIssueToken 이용해 issueToken 값을 변경할 수 있다.', () => {
      const state = passwordReducer(
        initialState,
        setIssueToken({
          issueToken: 'iamtoken12345',
        }),
      );

      expect(state.issueToken).toEqual('iamtoken12345');
    });

    it('setConfirmToken 이용해 confirmToken 값을 변경할 수 있다.', () => {
      const state = passwordReducer(
        initialState,
        setConfirmToken({
          confirmToken: 'iamtoken12345',
        }),
      );

      expect(state.confirmToken).toEqual('iamtoken12345');
    });

    it('setRemainTime 이용해 remainTime 값을 변경할 수 있다.', () => {
      const state = passwordReducer(
        initialState,
        setRemainTime({
          remainTime: 60,
        }),
      );

      expect(state.remainTime).toEqual(60);
    });

    it('setTimerId 이용해 timerId 값을 변경할 수 있다.', () => {
      const state = passwordReducer(
        initialState,
        setTimerId({
          timerId: 'xyz',
        }),
      );

      expect(state.timerId).toEqual('xyz');
    });

    // TODO: 테스트를 제대로 하는 방법을 생각해봐야 함
    it('resetTime 사용해 interval과 remainTime을 초기화 할 수 있다.', () => {
      const state = passwordReducer(initialState, resetTime());

      expect(state.timerId).toEqual('');
      expect(state.remainTime).toEqual(0);
    });

    // TODO: 테스트를 제대로 하는 방법을 생각해봐야 함
    it('startTime을 사용해 remainMillisecond를 초단위로 바꿔 remainTime이 1초씩 줄어들도록 한다.', () => {
      const state = passwordReducer(
        initialState,
        startTime({ remainMillisecond: 10000 }),
      );

      expect(state.timerId).toEqual('');
      expect(state.remainTime).toEqual(0);
    });

    // TODO: 테스트 시나리오 다시 생각해봐야 함 catch 로 가는 이류를 모르겠음
    //     it('checkEmailExist을 사용해 이메일 확인이 가능한지를 테스트한다.', async () => {
    //       let store = mockStore({});

    //       await store.dispatch(
    //         checkEmailExist({
    //           email: 'ably933@dummy.com',
    //         })
    //       );
    //       const actionsCheckEmailExist = store.getActions();
    //       expect(actionsCheckEmailExist[0]).toEqual();

    //       await store.dispatch(
    //         checkAuthCodeRight({
    //           email: 'ably933@dummy.com',
    //           authCode: actionsCheckEmailExist[0].payload.authCode,
    //         })
    //       );
    //       const actionsCheckAuthCodeRight = store.getActions();
    //       expect(actionsCheckAuthCodeRight[0]).toEqual();

    //       await store.dispatch(
    //         changePassword({
    //           email: 'ably933@dummy.com',
    //           confirmToken: actionsCheckEmailExist[0].payload.confirmToken,
    //           newPassword: '!abc321#$',
    //           newPasswordConfirm: '!abc321#$',
    //         })
    //       );
    //       const actionsChangePassword = store.getActions();
    //       expect(actionsChangePassword[0]).toEqual();
    //     });
  });
});
