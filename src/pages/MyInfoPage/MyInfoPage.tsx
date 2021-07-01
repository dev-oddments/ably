import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { get } from '@utils/snippet';
import { setInfo, setLogout } from '@store';

export default function MyInfoPage({ history }: RouteComponentProps) {
  const dispatch = useDispatch();
  const {
    isLogin, email, name, profileImage,
  } = useSelector(get('auth'));

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
          <div>
            email:
            {' '}
            {email}
          </div>
          <div>
            name:
            {' '}
            {name}
          </div>
          <img src={profileImage} alt="profile" />
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
