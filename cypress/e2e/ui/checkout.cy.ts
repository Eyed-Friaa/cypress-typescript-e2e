import { InventoryPage } from '../../pages/InventoryPage';

interface CheckoutInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}

/**
 * Checkout flow — full end-to-end user journeys against SauceDemo.
 *
 * These span login → inventory → cart → checkout → confirmation, which
 * is far more representative of real QA work than single-page checks.
 * Login is handled by the custom cy.loginViaUi() command (see commands.ts).
 */
describe('Shop › Checkout', () => {
  let checkoutInfo: CheckoutInfo;

  before(() => {
    cy.fixture('users').then((data) => {
      checkoutInfo = data.checkoutInfo;
    });
  });

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.loginViaUi();
  });

  it('completes a full purchase journey to order confirmation', () => {
    new InventoryPage()
      .addFirstItemToCart()
      .goToCart()
      .assertLoaded()
      .checkout()
      .fillInformation(
        checkoutInfo.firstName,
        checkoutInfo.lastName,
        checkoutInfo.postalCode
      )
      .continueToOverview()
      .finish()
      .assertOrderComplete();
  });

  it('added item appears in the cart', () => {
    new InventoryPage()
      .addItemToCart('Sauce Labs Backpack')
      .assertCartBadgeCount(1)
      .goToCart()
      .assertContainsItem('Sauce Labs Backpack');
  });

  it('shows a validation error when postal code is missing', () => {
    new InventoryPage()
      .addFirstItemToCart()
      .goToCart()
      .checkout()
      .fillInformation(checkoutInfo.firstName, checkoutInfo.lastName, '')
      .continueExpectingError()
      .assertErrorContains('Postal Code is required');
  });
});
