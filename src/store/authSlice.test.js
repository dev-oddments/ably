import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';
import authReducer, {
  setIsLogin,
  setUserInfo,
  setLogin,
  //   setInfo,
  setLogout,
} from './authSlice';

const middleWares = [...getDefaultMiddleware()];
const mockStore = configureStore(middleWares);

describe('authReducer에서', () => {
  context('각각', () => {
    const initialState = {
      isLogin: false,
      email: '',
      lastConnectedAt: '',
      name: '',
      profileImage: '',
    };

    it('setIsLogin을 이용해 isLogin을 토글할 수 있다.', () => {
      const state = authReducer(
        initialState,
        setIsLogin({
          isLogin: true,
        }),
      );

      expect(state.isLogin).toEqual(true);
    });

    it('setUserInfo를 사용해 유저에 해당하는 정보를 채울 수 있다.', () => {
      const state = authReducer(
        initialState,
        setUserInfo({
          info: {
            email: 'abc',
            lastConnectedAt: 'def',
            name: 'aaa',
            profileImage: 'bbb',
          },
        }),
      );

      expect(state.email).toEqual('abc');
      expect(state.lastConnectedAt).toEqual('def');
      expect(state.name).toEqual('aaa');
      expect(state.profileImage).toEqual('bbb');
    });

    it('setLogin을 사용해 로그인을 할 수 있다.', async () => {
      const store = mockStore({});

      await store.dispatch(
        setLogin({
          email: 'ably933@dummy.com',
          password: '!abc321#$',
        }),
      );
      const actions = store.getActions();

      expect(actions[0].payload.isLogin).toEqual(true);
    });

    // TODO: localStorage가 관여하므로 추후에 이를 해결하여 정상화
    //     it('setInfo를 사용해 유저 정보를 가져올 수 있다.', async () => {
    //       const store = mockStore({});

    //       await store.dispatch(setInfo());
    //       const actions = store.getActions();

    //       expect(actions[0].payload).toEqual();
    //     });

    // TODO: 로그인 상황을 재현하는 부분 추가해야 함
    it('setLogout을 사용해 로그아웃을 할 수 있다.', async () => {
      const store = mockStore({});

      await store.dispatch(setLogout());
      const actionsLogout = store.getActions();

      expect(actionsLogout[0].payload.isLogin).toEqual(false);
    });
  });
});
