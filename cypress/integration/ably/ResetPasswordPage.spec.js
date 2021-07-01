describe('ResetPasswordPage 에서', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/reset-password');
  });

  context('성공하는 테스트를 작성한다', () => {
    it('서버에 존재하는 email을 입력하면 email 입력창이 disable 되고 authCode 입력 창이 활성화 된다', () => {
      cy.get('input[name=email]').type('ably933@dummy.com');
      cy.get('input[name=email]').should('not.be.disabled');

      cy.contains('다음').click();

      cy.get('input[name=email]').should('be.disabled');
      cy.get('input[name=authCode]').should('not.be.disabled');
    });

    it('email과 인증 코드를 정상적으로 입력하면 newPassword 창이 활성화된다', () => {
      cy.get('input[name=email]').type('ably933@dummy.com');

      cy.contains('다음').click();

      cy.get('input[name=authCode]').type('171009');

      cy.contains('다음').click();

      cy.get('input[name=newPassword]').should('not.be.disabled');
      cy.get('input[name=newPasswordConfirm]').should('not.be.disabled');
    });

    it('새로운 패스워드를 일치하게 입력하면 입력하면 alert modal과 함께 메인페이지로 이동한다', () => {
      cy.get('input[name=email]').type('ably933@dummy.com');

      cy.contains('다음').click();

      cy.get('input[name=authCode]').type('171009');

      cy.contains('다음').click();

      cy.get('input[name=newPassword]').type('!abc321#$');
      cy.get('input[name=newPasswordConfirm]').type('!abc321#$');

      cy.contains('비밀번호 변경').click();

      cy.get('.alert-content').contains('비밀번호 변경이 완료되었습니다!');
      cy.url().should('not.include', '/reset-password');
    });
  });

  context('실패하는 테스트를 작성한다', () => {
    it('서버에 존재하지 않는 email을 입력하면 alert modal이 나타난다', () => {
      cy.get('input[name=email]').type('none@dummy.com');

      cy.contains('다음').click();

      cy.get('.alert-content').contains('email 데이터가 없어요');
    });

    it('email이 공백인 경우 alert modal이 나타난다', () => {
      cy.contains('다음').click();

      cy.get('.alert-content').contains('email 파라미터가 누락됐어요');
    });

    it('인증 코드를 정상적으로 입력하지 않으면 alert modal이 나타난다', () => {
      cy.get('input[name=email]').type('ably933@dummy.com');

      cy.contains('다음').click();

      cy.get('input[name=authCode]').type('1719');

      cy.contains('다음').click();

      cy.get('.alert-content').contains('authCode 값이 올바르지 않아요');
    });

    it('인증 코드가 공백인 경우 alert modal이 나타난다', () => {
      cy.get('input[name=email]').type('ably933@dummy.com');

      cy.contains('다음').click();

      cy.get('input[name=authCode]').should('not.be.disabled');

      cy.contains('다음').click();

      cy.get('.alert-content').contains('authCode 파라미터가 누락 되었어요');
    });

    it('newPassword를 입력하지 않은 경우 alert modal이 나타난다', () => {
      cy.get('input[name=email]').type('ably933@dummy.com');

      cy.contains('다음').click();

      cy.get('input[name=authCode]').type('171009');

      cy.contains('다음').click();

      cy.get('input[name=newPassword]').should('not.be.disabled');

      cy.contains('비밀번호 변경').click();

      cy.get('.alert-content').contains('newPassword 파라미터가 누락됐어요');
    });

    it('newPasswordConfirm을 입력하지 않은 경우 alert modal이 나타난다', () => {
      cy.get('input[name=email]').type('ably933@dummy.com');

      cy.contains('다음').click();

      cy.get('input[name=authCode]').type('171009');

      cy.contains('다음').click();

      cy.get('input[name=newPassword]').type('!abc321#$');

      cy.contains('비밀번호 변경').click();

      cy.get('.alert-content').contains(
        'newPasswordConfirm 파라미터가 누락됐어요'
      );
    });

    it('newPassword와 newPasswordConfirm가 같지 않은경우 alert modal이 나타난다', () => {
      cy.get('input[name=email]').type('ably933@dummy.com');

      cy.contains('다음').click();

      cy.get('input[name=authCode]').type('171009');

      cy.contains('다음').click();

      cy.get('input[name=newPassword]').type('!abc321#$');
      cy.get('input[name=newPasswordConfirm]').type('!ab1#$');

      cy.contains('비밀번호 변경').click();

      cy.get('.alert-content').contains(
        'newPassword와 newPasswordConfirm 값이 서로 달라요'
      );
    });
  });
});
