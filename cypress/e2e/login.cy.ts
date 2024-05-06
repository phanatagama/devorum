/**
 * Test scenario for login page
 * - Should display form email & password when the login page render correctly
 * - Should show error message when login with incorrect format of email and password
 * - Should show alert message when login with an invalid email and password
 * - Should show alert message  when login successfully
 */
describe('Login spec test', () => {
  it('Should display login page correctly', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[data-testid="email"]').should('be.visible');
    cy.get('input[data-testid="password"]').should('be.visible');
    cy.get('button')
      .contains(/^Sign In$/)
      .should('be.visible');
  });
  it('Should show error message when login with incorrect format of email and password', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('button')
      .contains(/^Sign In$/)
      .click();
    cy.get('span').contains('Invalid email address');
    cy.get('span').contains('Password must be at least 8 characters');
  });
  it('Should show alert message when login with an invalid email and password', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[data-testid="email"]').type('joko2024@gmail.com');
    cy.get('input[data-testid="password"]').type('12345678');
    cy.get('button')
      .contains(/^Sign In$/)
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(
        'Login failed! Please try again.\nemail or password is wrong',
      );
    });
  });
  it('Should show alert message when login successfully', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[data-testid="email"]').type('joko2024@gmail.com');
    cy.get('input[data-testid="password"]').type('dicoding2029');
    cy.get('button')
      .contains(/^Sign In$/)
      .click();
    cy.on('window:alert', (str) => {
      expect(str).contains('Login successful');
    });
  });
});

export {};
