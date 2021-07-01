import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { get } from '@utils/snippet';
import { setInfo, setLogout } from '@store';
import { Image, Text } from '@atoms';

import { Button } from '@molecules';

const Wrapper = styled.div`
  ${({ theme: { flexCol } }) => flexCol('space-around')}
  width: 100%;
  height: 100%;
  max-width: 600px;
  max-height: 600px;

  .image {
    border-radius: 10px;
  }

  .info {
    ${({ theme: { flexCol } }) => flexCol()}
  }
`;

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
    <Wrapper>
      {isLogin && (
        <>
          <Image
            className="image"
            src={profileImage}
            alt="profile"
            height="50%"
          />

          <div className="info">
            <Text className="name" text={name} fontSetting="n14b" />
            <Text className="email" text={email} fontSetting="n12m" />
          </div>
        </>
      )}
      <Button
        title="로그아웃"
        func={() => {
          dispatch(setLogout());
          history.push('/');
        }}
        isNormal
      />
    </Wrapper>
  );
}
