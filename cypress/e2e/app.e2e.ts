describe('Welcome page', () => {
  it(`should render 'Welcome' message`, () => {
    cy.visit('/');
    cy.contains('Welcome!');
  });
});
