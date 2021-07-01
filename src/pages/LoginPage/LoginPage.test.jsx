import React from 'react';

import { render } from '@parse/test-utils';

import { LoginPage } from '@pages';

function renderLoginPage() {
  return render(<LoginPage />);
}

describe('LoginPage', () => {
  it('LoginPage 가 제대로 렌더링 되는지 확인한다', () => {
    const { container } = renderLoginPage();

    expect(container).toBeTruthy();
  });
});
