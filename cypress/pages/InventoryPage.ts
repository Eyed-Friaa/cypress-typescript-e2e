import { BasePage } from './BasePage';
import { CartPage } from './CartPage';

/**
 * Page Object for the SauceDemo inventory (products) page.
 */
export class InventoryPage extends BasePage {
  protected readonly path = '/inventory.html';

  private readonly title = '.title';
  private readonly inventoryItem = '.inventory_item';
  private readonly itemName = '.inventory_item_name';
  private readonly cartBadge = '.shopping_cart_badge';
  private readonly cartLink = '.shopping_cart_link';
  private readonly sortDropdown = '[data-test="product_sort_container"]';

  assertLoaded(): this {
    cy.get(this.title).should('have.text', 'Products');
    this.assertUrlContains('inventory');
    return this;
  }

  getItemCount(): Cypress.Chainable<number> {
    return cy.get(this.inventoryItem).its('length');
  }

  /** Add a specific product to the cart by its visible name. */
  addItemToCart(productName: string): this {
    cy.contains(this.itemName, productName)
      .parents(this.inventoryItem)
      .find('button')
      .click();
    return this;
  }

  addFirstItemToCart(): this {
    cy.get(`${this.inventoryItem} button`).first().click();
    return this;
  }

  assertCartBadgeCount(count: number): this {
    cy.get(this.cartBadge).should('have.text', String(count));
    return this;
  }

  sortBy(option: 'az' | 'za' | 'lohi' | 'hilo'): this {
    cy.get(this.sortDropdown).select(option);
    return this;
  }

  /** Returns the product names in their current display order. */
  getProductNames(): Cypress.Chainable<string[]> {
    return cy.get(this.itemName).then(($els) =>
      Cypress._.map($els.toArray(), (el) => el.innerText)
    );
  }

  goToCart(): CartPage {
    this.click(this.cartLink);
    return new CartPage();
  }
}
