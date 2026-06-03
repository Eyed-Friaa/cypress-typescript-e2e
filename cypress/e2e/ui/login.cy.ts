import { LoginPage } from '../../pages/LoginPage';

/**
 * Login feature — UI tests against SauceDemo.
 * Demonstrates: Page Object Model, fixtures for data-driven tests,
 * and both happy-path and negative scenarios.
 */
describe('Authentication › Login', () => {
  let users: {
    standard: { username: string; password: string };
    lockedOut: { username: string; password: string };
    invalid: { username: string; password: string };
  };

  before(() => {
    cy.fixture('users').then((data) => {
      users = data;
    });
  });

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('standard user can log in successfully', () => {
    new LoginPage()
      .visit()
      .login(users.standard.username, users.standard.password)
      .assertLoaded();
  });

  it('shows an error for invalid credentials', () => {
    new LoginPage()
      .visit()
      .enterUsername(users.invalid.username)
      .enterPassword(users.invalid.password)
      .submitExpectingError()
      .assertErrorContains('Username and password do not match');
  });

  it('shows an error when credentials are empty', () => {
    new LoginPage()
      .visit()
      .submitExpectingError()
      .assertErrorContains('Username is required');
  });

  it('blocks a locked-out user', () => {
    new LoginPage()
      .visit()
      .enterUsername(users.lockedOut.username)
      .enterPassword(users.lockedOut.password)
      .submitExpectingError()
      .assertErrorContains('Sorry, this user has been locked out');
  });
});
