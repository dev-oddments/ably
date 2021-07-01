describe('LoginPage에서', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });
  it('제대로된 이메일, 패스워드를 넣고 로그인을 누르면 my-info 페이지로 이동한다', () => {
    cy.get('input[name=email]').type('ably933@dummy.com');
    cy.get('input[name=password]').type('!abc321#$');

    cy.contains('로그인').click();

    cy.url().should('include', '/my-info');
  });

  it('잘못된 이메일, 패스워드를 넣고 로그인을 누르면 alert modal이 노출된다', () => {
    cy.get('input[name=email]').type('none@dummy.com');
    cy.get('input[name=password]').type('!abc321#$');

    cy.contains('로그인').click();

    cy.get('.alert-content').contains('가입되지 않은 이메일이에요');
  });

  it('제대로된 이메일, 잘못된 패스워드를 넣고 로그인을 누르면 alert modal이 노출된다', () => {
    cy.get('input[name=email]').type('ably933@dummy.com');
    cy.get('input[name=password]').type('!#$');

    cy.contains('로그인').click();

    // TODO: 서버에 반영되면 잘못된 비밀번호에요로 변경
    cy.get('.alert-content').contains('잘못된 비밀번호예요');
  });

  it('이메일에 공백을 넣고 로그인을 누르면 my-info 페이지로 이동한다', () => {
    cy.contains('로그인').click();

    cy.get('.alert-content').contains('email 파라미터가 누락됐어요');
  });

  it('비밀번호에 공백을 넣고 로그인을 누르면 my-info 페이지로 이동한다', () => {
    cy.get('input[name=email]').type('ably933@dummy.com');

    cy.contains('로그인').click();

    cy.get('.alert-content').contains('password 파라미터가 누락됐어요');
  });
});
