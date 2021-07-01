/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { get } from '@utils/snippet';
import { setInfo } from '@store';

import { loadItem } from '@utils/storage';

export default function AuthRoute({
  component: Component,
  render,
  ...rest
}: any): ReactElement {
  const dispatch = useDispatch();
  const { isLogin } = useSelector(get('auth'));
  const accessToken = loadItem('accessToken');

  useEffect(() => {
    (async () => {
      if (accessToken !== null && !isLogin) {
        await dispatch(setInfo());
      }
    })();
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (isLogin || accessToken ? (
        render ? (
          render(props)
        ) : (
          <Component {...props} />
        )
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      ))}
    />
  );
}
