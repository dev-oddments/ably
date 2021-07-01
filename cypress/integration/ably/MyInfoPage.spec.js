describe('MyInfoPage 에서', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');

    cy.get('input[name=email]').type('ably933@dummy.com');
    cy.get('input[name=password]').type('!abc321#$');

    cy.contains('로그인').click();
  });

  it('email, name, profile image가 제대로 노출된다', () => {
    cy.get('.email').contains('ably933@dummy.com');
    cy.get('.name').contains('에이블리933');
    cy.get('.image')
      .should('have.attr', 'src')
      .should('include', 'loremflickr');
  });
});
