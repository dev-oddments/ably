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
} from './authSlice';

const reducers = combineReducers({
  modal: modalReducer,
  auth: authReducer,
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
};
