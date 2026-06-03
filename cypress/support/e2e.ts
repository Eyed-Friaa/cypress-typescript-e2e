// Cypress support file — loaded before every e2e spec.
// Import custom commands so they're available globally.
import './commands';
import 'allure-cypress';

// Block third-party analytics (backtrace.io) that block the page load event in CI.
// These requests return 401 and prevent `load` from firing within the timeout.
beforeEach(() => {
  cy.intercept('POST', 'https://events.backtrace.io/**', { statusCode: 200 }).as('backtraceBlock');
});
