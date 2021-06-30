import React from 'react';

import { render } from '@testing-library/react';

import App from './App';

function app() {
  return render(<App />);
}

describe('App', () => {
  it('App 컴포넌트가 제대로 렌더링 되는지 확인한다', () => {
    const { container } = app();

    expect(container).toBeTruthy();
  });
});
