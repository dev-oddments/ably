import React, { ReactElement, useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import { get, convertSecondsToMinute } from '@utils/snippet';

import { checkEmailExist, checkAuthCodeRight, changePassword } from '@store';

import {
  EMAIL_EXIST,
  AUTH_CODE_CHECK,
  PASSWORD_CHANGE,
} from '@utils/constants';

import { Button } from '@molecules';

const Wrapper = styled.div<{ isWarning: boolean }>`
  ${({ theme }) => theme.flexCol()}

  input {
    ${({ theme: { input } }) => input}
  }

  .code-check {
    position: relative;
    .timer {
      position: absolute;
      top: 3px;
      right: 5px;

      margin-bottom: 20px;

      ${({ isWarning }) => isWarning && 'color: red'};
      ${({
        theme: {
          font: { n12b },
        },
      }) => n12b}
    }
  }
`;

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
        }),
      ),
    [PASSWORD_CHANGE]: () =>
      dispatch(
        changePassword({
          email: emailRef.current.value,
          newPassword: newPasswordRef.current.value,
          newPasswordConfirm: newPasswordConfirmRef.current.value,
          history,
        }),
      ),
  }[route];

  return (
    <Wrapper isWarning={remainTime < 60}>
      <input
        type="input"
        name="email"
        ref={emailRef}
        placeholder="이메일 입력"
        disabled={route !== EMAIL_EXIST}
        onKeyDown={({ key }) => key === 'Enter' && handleClickButton()}
      />
      {
        {
          [AUTH_CODE_CHECK]: (
            <div className="code-check">
              <input
                type="input"
                name="authCode"
                ref={authCodeRef}
                placeholder="인증번호 입력"
                onKeyDown={({ key }) => key === 'Enter' && handleClickButton()}
              />
              <div className="timer">{convertSecondsToMinute(remainTime)}</div>
            </div>
          ),
          [PASSWORD_CHANGE]: (
            <>
              <div />
              <input
                type="password"
                name="newPassword"
                ref={newPasswordRef}
                placeholder="변경할 비밀번호 입력"
                onKeyDown={({ key }) => key === 'Enter' && handleClickButton()}
              />
              <input
                type="password"
                name="newPasswordConfirm"
                ref={newPasswordConfirmRef}
                placeholder="변경할 비밀번호 한번 더 입력"
                onKeyDown={({ key }) => key === 'Enter' && handleClickButton()}
              />
            </>
          ),
        }[route]
      }

      <Button
        title={route === PASSWORD_CHANGE ? '비밀번호 변경' : '다음'}
        func={handleClickButton}
        isNormal
      />
    </Wrapper>
  );
}
