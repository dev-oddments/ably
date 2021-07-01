import React, { ReactElement, useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import { useDispatch } from 'react-redux';
import { setLogin } from '@store';

import { Button } from '@molecules';

const Wrapper = styled.div`
  ${({ theme }) => theme.flexCol()}

  input {
    ${({ theme: { input } }) => input}
  }

  .reset-password {
    background-color: transparent;
    border: none;

    margin-top: 20px;

    :hover {
      opacity: 0.8;
    }

    cursor: pointer;
  }
`;

export default function LoginPage({
  history,
}: RouteComponentProps): ReactElement {
  const dispatch = useDispatch();

  const emailRef: any = useRef<HTMLInputElement>(null);
  const passwordRef: any = useRef<HTMLInputElement>(null);

  return (
    <Wrapper>
      <input
        type="input"
        name="email"
        ref={emailRef}
        placeholder="이메일 입력"
      />
      <input
        type="password"
        name="password"
        ref={passwordRef}
        placeholder="비밀번호 입력"
      />
      <Button
        title="로그인"
        func={async () => {
          await dispatch(
            setLogin(
              {
                email: emailRef.current.value,
                password: passwordRef.current.value,
              },
              history,
            ),
          );
        }}
        isNormal
      />
      <button
        className="reset-password"
        type="button"
        onClick={() => history.push('reset-password')}
      >
        비밀번호 재설정
      </button>
    </Wrapper>
  );
}
