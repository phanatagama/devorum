describe('Login spec', () => {
  it('Should display login page correctly', () => {
    cy.visit('http://localhost:3000/login');
    // memverifikasi elemen yang harus tampak pada halaman login
    cy.get('input[data-testid="email"]').should('be.visible');
    cy.get('input[data-testid="password"]').should('be.visible');
    cy.get('button')
      .contains(/^Sign In$/)
      .should('be.visible');
  });
  it('Should display error message when login with invalid email and password', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('button')
      .contains(/^Sign In$/)
      .click();
    cy.get('span').contains('Invalid email address');
    cy.get('span').contains('Password must be at least 8 characters');
  });
  it('Should display alert message when login with invalid email and passowrd', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[data-testid="email"]').type('joko2024@gmail.com');
    cy.get('input[data-testid="password"]').type('12345678');
    cy.get('button')
      .contains(/^Sign In$/)
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(
        'Login failed! Please try again.\nemail or password is wrong'
      );
    });
  });
  it('Should display alert message when login successfully', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[data-testid="email"]').type('joko2024@gmail.com');
    cy.get('input[data-testid="password"]').type('dicoding2029');
    cy.get('button')
      .contains(/^Sign In$/)
      .click();
    cy.on('window:alert', (str) => {
      expect(str).contains('Login successful');
    });
    cy.get('nav')
      .contains(/^Home$/)
      .should('be.visible');
    cy.get('nav')
      .contains(/^Sign Out$/)
      .should('be.visible');
    cy.get('h2').contains('Create Thread').should('be.visible');
  });
});

export {};
