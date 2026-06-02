import { BasePage } from './BasePage';

/**
 * Page Object for the SauceDemo checkout flow.
 */
export class CheckoutPage extends BasePage {
  protected readonly path = '/checkout-step-one.html';

  private readonly firstName = '[data-test="firstName"]';
  private readonly lastName = '[data-test="lastName"]';
  private readonly postalCode = '[data-test="postalCode"]';
  private readonly continueButton = '[data-test="continue"]';
  private readonly finishButton = '[data-test="finish"]';
  private readonly errorMessage = '[data-test="error"]';
  private readonly confirmHeader = '.complete-header';

  fillInformation(first: string, last: string, zip: string): this {
    if (first) this.type(this.firstName, first);
    if (last) this.type(this.lastName, last);
    if (zip) this.type(this.postalCode, zip);
    return this;
  }

  continueToOverview(): this {
    return this.click(this.continueButton);
  }

  continueExpectingError(): this {
    return this.click(this.continueButton);
  }

  finish(): this {
    return this.click(this.finishButton);
  }

  assertOrderComplete(): this {
    cy.get(this.confirmHeader)
      .should('be.visible')
      .and('contain.text', 'Thank you for your order');
    return this;
  }

  assertErrorContains(text: string): this {
    cy.get(this.errorMessage).should('be.visible').and('contain.text', text);
    return this;
  }
}
