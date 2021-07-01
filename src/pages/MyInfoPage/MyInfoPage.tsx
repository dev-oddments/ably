import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { get } from '@utils/snippet';
import { setInfo, setLogout } from '@store';

export default function MyInfoPage({ history }: RouteComponentProps) {
  const dispatch = useDispatch();
  const { isLogin, email, name, profileImage } = useSelector(get('auth'));

  useEffect(() => {
    (async () => {
      if (email === '' || name === '' || profileImage === '') {
        await dispatch(setInfo());
      }
    })();
  }, []);

  return (
    <>
      {isLogin && (
        <>
          <div className="email">email: {email}</div>
          <div className="name">name: {name}</div>
          <img className="image" src={profileImage} alt="profile" />
        </>
      )}
      <button
        type="button"
        onClick={() => {
          dispatch(setLogout());
          history.push('/');
        }}
      >
        로그아웃
      </button>
    </>
  );
}
