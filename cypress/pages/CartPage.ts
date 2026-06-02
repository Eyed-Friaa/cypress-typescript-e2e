import { BasePage } from './BasePage';
import { CheckoutPage } from './CheckoutPage';

/**
 * Page Object for the SauceDemo cart page.
 */
export class CartPage extends BasePage {
  protected readonly path = '/cart.html';

  private readonly cartItem = '.cart_item';
  private readonly itemName = '.inventory_item_name';
  private readonly checkoutButton = '[data-test="checkout"]';
  private readonly removeButton = 'button[data-test^="remove"]';

  assertLoaded(): this {
    this.assertUrlContains('cart');
    return this;
  }

  getItemCount(): Cypress.Chainable<number> {
    return cy.get('body').then(($body) => {
      return $body.find(this.cartItem).length;
    });
  }

  assertContainsItem(productName: string): this {
    cy.get(this.itemName).should('contain.text', productName);
    return this;
  }

  removeFirstItem(): this {
    cy.get(this.removeButton).first().click();
    return this;
  }

  checkout(): CheckoutPage {
    this.click(this.checkoutButton);
    return new CheckoutPage();
  }
}
