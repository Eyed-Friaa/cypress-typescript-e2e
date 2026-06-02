import { LoginPage } from '../pages/LoginPage';

/**
 * Custom Cypress commands with full TypeScript typings.
 *
 * loginViaUi demonstrates a reusable, type-safe custom command — one of
 * the most common real-world Cypress patterns for cutting login
 * boilerplate out of every UI spec.
 */

// ─── Type declarations ───────────────────────────────────────────────────────
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Logs in through the UI using the SauceDemo standard user.
       * @example cy.loginViaUi()
       */
      loginViaUi(username?: string, password?: string): Chainable<void>;
    }
  }
}

// ─── Implementations ─────────────────────────────────────────────────────────
Cypress.Commands.add(
  'loginViaUi',
  (
    username: string = Cypress.env('standardUser'),
    password: string = Cypress.env('password')
  ) => {
    new LoginPage().visit().login(username, password).assertLoaded();
  }
);

// Required when this file has top-level imports under isolatedModules.
export {};
