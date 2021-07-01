import Axios from 'axios';

interface ApiParameter {
  url: string;
  type: string;
  param?: any;
}

export const SERVER_URL: string = process.env.REACT_APP_API_SERVER_URL || 'https://ably-frontend-interview-server.vercel.app';

const api = ({ url, type = 'get', param }: ApiParameter) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  // TODO: jwt를 넣을 API에는 포함해야 함

  // TODO: 추후에 타입 정의를 다시 해야 할 필요성이 있음
  // @ts-ignore
  return Axios({
    method: type,
    url: `${SERVER_URL}${url}`,
    headers,
    data: param,
  });
};

export default api;
