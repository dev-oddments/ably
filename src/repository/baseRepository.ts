import api from '@context/serverContext';

export const getAuthCodeApi = async ({ email }) => await api({
  url: `/api/reset-password?email=${email}`,
  type: 'get',
});

export const postAuthCodeCompareApi = async ({ param }) => await api({
  url: '/api/reset-password',
  type: 'post',
  param,
});

export const patchAuthCodeChangeApi = async ({ param }) => await api({
  url: '/api/reset-password',
  type: 'patch',
  param,
});

export const postLoginApi = async ({ param }) => await api({
  url: '/api/login',
  type: 'post',
  param,
});

export const postLogoutApi = async ({ param }) => await api({
  url: '/api/logout',
  type: 'post',
  param,
});

export const getUserInfoApi = async () => await api({
  url: '/api/user',
  type: 'get',
});
