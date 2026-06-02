import { BasePage } from './BasePage';
import { InventoryPage } from './InventoryPage';

/**
 * Page Object for the SauceDemo login page.
 * Uses data-test selectors (the most stable option SauceDemo exposes).
 */
export class LoginPage extends BasePage {
  protected readonly path = '/';

  private readonly usernameInput = '[data-test="username"]';
  private readonly passwordInput = '[data-test="password"]';
  private readonly loginButton = '[data-test="login-button"]';
  private readonly errorMessage = '[data-test="error"]';

  enterUsername(username: string): this {
    return this.type(this.usernameInput, username);
  }

  enterPassword(password: string): this {
    return this.type(this.passwordInput, password);
  }

  submit(): InventoryPage {
    this.click(this.loginButton);
    return new InventoryPage();
  }

  submitExpectingError(): this {
    this.click(this.loginButton);
    return this;
  }

  /** Complete happy-path login. */
  login(username: string, password: string): InventoryPage {
    return this.enterUsername(username).enterPassword(password).submit();
  }

  assertErrorContains(text: string): this {
    cy.get(this.errorMessage).should('be.visible').and('contain.text', text);
    return this;
  }
}
