import { createSlice } from '@reduxjs/toolkit';
import { displayModal } from '@store';
import { MODALS } from '@utils/constants';
import { postLoginApi, getUserInfoApi } from '@repository/baseRepository';
import { saveItem } from '@utils/storage';

const authReducer = createSlice({
  name: 'auth',
  initialState: {
    isLogin: false,
    email: '',
    lastConnectedAt: '',
    name: '',
    profileImage: '',
  },
  reducers: {
    setIsLogin(state, { payload: { isLogin } }) {
      return {
        ...state,
        isLogin,
      };
    },
    setUserInfo(state, { payload: { info } }) {
      return {
        ...state,
        ...info,
      };
    },
  },
});

export const { setIsLogin, setUserInfo } = authReducer.actions;
export default authReducer.reducer;

export const setLogin = (param) => async (dispatch) => {
  try {
    const {
      data: { accessToken },
    } = await postLoginApi({
      param,
    });

    await saveItem('accessToken', accessToken);
    dispatch(setIsLogin({ isLogin: true }));
  } catch ({
    response: {
      data: {
        error: { message },
      },
    },
  }) {
    dispatch(
      displayModal({
        modalName: MODALS.ALERT_MODAL,
        content: message,
      }),
    );
  }
};

export const setInfo = () => async (dispatch) => {
  try {
    const { data } = await getUserInfoApi();

    dispatch(setUserInfo({ info: data }));
  } catch ({
    response: {
      data: {
        error: { message },
      },
    },
  }) {
    dispatch(
      displayModal({
        modalName: MODALS.ALERT_MODAL,
        content: message,
      }),
    );
  }
};
