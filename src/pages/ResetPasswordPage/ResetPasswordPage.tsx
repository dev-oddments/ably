import React, { ReactElement, useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { get } from '@utils/snippet';

import { checkEmailExist, checkAuthCodeRight, changePassword } from '@store';

import {
  EMAIL_EXIST,
  AUTH_CODE_CHECK,
  PASSWORD_CHANGE,
} from '@utils/constants';

export default function ResetPasswordPage({
  history,
}: RouteComponentProps): ReactElement {
  const dispatch = useDispatch();
  const { route, remainTime } = useSelector(get('password'));

  const emailRef: any = useRef<HTMLInputElement>(null);
  const authCodeRef: any = useRef<HTMLInputElement>(null);
  const newPasswordRef: any = useRef<HTMLInputElement>(null);
  const newPasswordConfirmRef: any = useRef<HTMLInputElement>(null);

  const handleClickButton = {
    [EMAIL_EXIST]: async () =>
      await dispatch(checkEmailExist({ email: emailRef.current.value })),
    [AUTH_CODE_CHECK]: () =>
      dispatch(
        checkAuthCodeRight({
          email: emailRef.current.value,
          authCode: authCodeRef.current.value,
        })
      ),
    [PASSWORD_CHANGE]: () =>
      dispatch(
        changePassword({
          email: emailRef.current.value,
          newPassword: newPasswordRef.current.value,
          newPasswordConfirm: newPasswordConfirmRef.current.value,
          history,
        })
      ),
  }[route];

  return (
    <>
      <input
        type="input"
        name="email"
        ref={emailRef}
        disabled={route !== EMAIL_EXIST}
        onKeyDown={({ key }) => key === 'Enter' && handleClickButton()}
      />
      {
        {
          [AUTH_CODE_CHECK]: (
            <>
              <input
                type="input"
                name="authCode"
                ref={authCodeRef}
                onKeyDown={({ key }) => key === 'Enter' && handleClickButton()}
              />
              <div>{remainTime}</div>
            </>
          ),
          [PASSWORD_CHANGE]: (
            <>
              <div />
              <input
                type="password"
                name="newPassword"
                ref={newPasswordRef}
                onKeyDown={({ key }) => key === 'Enter' && handleClickButton()}
              />
              <input
                type="password"
                name="newPasswordConfirm"
                ref={newPasswordConfirmRef}
                onKeyDown={({ key }) => key === 'Enter' && handleClickButton()}
              />
            </>
          ),
        }[route]
      }

      <button type="button" onClick={handleClickButton}>
        {route === PASSWORD_CHANGE ? '비밀번호 변경' : '다음'}
      </button>
    </>
  );
}
