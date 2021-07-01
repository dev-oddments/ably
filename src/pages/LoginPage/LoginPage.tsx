import React, { ReactElement, useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setLogin } from '@store';

export default function LoginPage({
  history,
}: RouteComponentProps): ReactElement {
  const dispatch = useDispatch();
  const emailRef: any = useRef<HTMLInputElement>(null);
  const passwordRef: any = useRef<HTMLInputElement>(null);

  return (
    <>
      <input type="input" ref={emailRef} />
      <input type="password" ref={passwordRef} />
      <button
        type="button"
        onClick={async () => {
          await dispatch(
            setLogin({
              email: emailRef.current.value,
              password: passwordRef.current.value,
            }),
          );
          history.push('/my-info');
        }}
      >
        로그인
      </button>
      <button type="button" onClick={() => history.push('reset-password')}>
        비밀번호 재설정
      </button>
    </>
  );
}
