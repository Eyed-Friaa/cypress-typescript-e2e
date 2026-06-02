/**
 * Base class for all Page Objects.
 *
 * Centralises common interactions so concrete pages stay declarative.
 * Cypress already retries assertions and waits automatically, so there
 * are no explicit waits here — that's idiomatic Cypress.
 */
export abstract class BasePage {
  /** Each page declares the path it lives at (relative to baseUrl). */
  protected abstract readonly path: string;

  visit(): this {
    cy.visit(this.path);
    return this;
  }

  protected getByTestId(testId: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(`[data-test="${testId}"]`);
  }

  protected click(selector: string): this {
    cy.get(selector).click();
    return this;
  }

  protected type(selector: string, text: string): this {
    cy.get(selector).clear().type(text);
    return this;
  }

  /** Assert the current URL contains a fragment. */
  assertUrlContains(fragment: string): this {
    cy.url().should('include', fragment);
    return this;
  }
}
