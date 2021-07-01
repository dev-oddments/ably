import { createSlice } from '@reduxjs/toolkit';
import { displayModal } from '@store';
import {
  MODALS,
  EMAIL_EXIST,
  AUTH_CODE_CHECK,
  PASSWORD_CHANGE,
} from '@utils/constants';
import {
  getAuthCodeApi,
  postAuthCodeCompareApi,
  patchAuthCodeChangeApi,
} from '@repository/baseRepository';

const passwordReducer = createSlice({
  name: 'password',
  initialState: {
    route: EMAIL_EXIST,
    issueToken: '',
    confirmToken: '',
    remainTime: 0,
    timerId: '',
  },
  reducers: {
    setRoute(state, { payload: { route } }) {
      return {
        ...state,
        route,
      };
    },
    setIssueToken(state, { payload: { issueToken } }) {
      return {
        ...state,
        issueToken,
      };
    },
    setConfirmToken(state, { payload: { confirmToken } }) {
      return {
        ...state,
        confirmToken,
      };
    },
    setRemainTime(state, { payload: { remainTime } }) {
      return {
        ...state,
        remainTime,
      };
    },
    setTimerId(state, { payload: { timerId } }) {
      return {
        ...state,
        timerId,
      };
    },
  },
});

export const {
  setRoute,
  setIssueToken,
  setConfirmToken,
  setRemainTime,
  setTimerId,
} = passwordReducer.actions;
export default passwordReducer.reducer;

export const resetTime = () => (dispatch, getState) => {
  const {
    password: { timerId },
  } = getState();

  clearInterval(timerId);
  dispatch(setTimerId({ timerId: '' }));
  dispatch(setRemainTime({ remainTime: 0 }));
};

export const startTime =
  ({ remainMillisecond }) =>
  (dispatch, getState) => {
    dispatch(resetTime());
    dispatch(setRemainTime({ remainTime: Number(remainMillisecond / 1000) }));

    const timerId = setInterval(() => {
      const {
        password: { remainTime },
      } = getState();

      if (remainTime === 0) {
        dispatch(
          displayModal({
            modalName: MODALS.ALERT_MODAL,
            content: '시간이 만료되어 이메일을 다시 입력해주셔야 합니다!',
          }),
        );
        dispatch(setRoute({ route: EMAIL_EXIST }));
        return dispatch(resetTime());
      }
      return dispatch(setRemainTime({ remainTime: remainTime - 1 }));
    }, 1000);

    dispatch(setTimerId({ timerId }));
  };

export const checkEmailExist =
  ({ email }) =>
  async (dispatch) => {
    try {
      const {
        data: { issueToken, remainMillisecond },
      } = await getAuthCodeApi({ email });

      dispatch(setRoute({ route: AUTH_CODE_CHECK }));
      dispatch(setIssueToken({ issueToken }));
      dispatch(startTime({ remainMillisecond }));
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

export const checkAuthCodeRight =
  ({ email, authCode }) =>
  async (dispatch, getState) => {
    const {
      password: { issueToken },
    } = getState();

    try {
      const {
        data: { confirmToken },
      } = await postAuthCodeCompareApi({
        param: { email, authCode, issueToken },
      });

      dispatch(setRoute({ route: PASSWORD_CHANGE }));
      dispatch(setConfirmToken({ confirmToken }));
      dispatch(resetTime());
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

// eslint-disable-next-line max-len
export const changePassword =
  ({ email, newPassword, newPasswordConfirm, history }) =>
  async (dispatch, getState) => {
    const {
      password: { confirmToken },
    } = getState();

    try {
      await patchAuthCodeChangeApi({
        param: {
          email,
          confirmToken,
          newPassword,
          newPasswordConfirm,
        },
      });

      history.push('/');
      dispatch(setRoute({ route: EMAIL_EXIST }));
      dispatch(setIssueToken({ issueToken: '' }));
      dispatch(setConfirmToken({ confirmToken: '' }));
      dispatch(
        displayModal({
          modalName: MODALS.ALERT_MODAL,
          content: '비밀번호 변경이 완료되었습니다!',
        }),
      );
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
