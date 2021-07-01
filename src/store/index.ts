import { configureStore, combineReducers } from '@reduxjs/toolkit';

import modalReducer, {
  displayModal,
  removeModal,
  setContent,
} from './modalSlice';

import authReducer, {
  setIsLogin,
  setUserInfo,
  setLogin,
  setInfo,
  setLogout,
} from './authSlice';

// eslint-disable-next-line import/no-cycle
import passwordReducer, {
  checkEmailExist,
  checkAuthCodeRight,
  changePassword,
} from './passwordSlice';

const reducers = combineReducers({
  modal: modalReducer,
  auth: authReducer,
  password: passwordReducer,
});

const store = configureStore({ reducer: reducers });

export default store;
export {
  displayModal,
  removeModal,
  setContent,
  setIsLogin,
  setUserInfo,
  setLogin,
  setInfo,
  setLogout,
  checkEmailExist,
  checkAuthCodeRight,
  changePassword,
};
