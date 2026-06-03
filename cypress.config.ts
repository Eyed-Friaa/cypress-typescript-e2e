import { defineConfig } from 'cypress';

export default defineConfig({
  // ─── Global settings ──────────────────────────────────────────────────────
  viewportWidth: 1920,
  viewportHeight: 1080,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 120000,
  requestTimeout: 15000,
  responseTimeout: 15000,
  video: true,
  screenshotOnRunFailure: true,
  retries: {
    // Retry failing tests in CI to absorb flakiness; no retries locally so
    // flakiness surfaces during development.
    runMode: 2,
    openMode: 0,
  },

  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',

    env: {
      // API base used by the API specs and Newman collection.
      apiUrl: 'https://jsonplaceholder.typicode.com',
      // Demo credentials (public SauceDemo test account).
      standardUser: 'standard_user',
      password: 'secret_sauce',
    },

    setupNodeEvents(on, config) {
      // Allure reporter (dynamic require to avoid TS module resolution issues)
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { allureCypress } = require('allure-cypress/reporter');
      allureCypress(on, config, { resultsDir: 'allure-results' });

      // Log task — lets specs print to the terminal for debugging.
      on('task', {
        log(message: string) {
          console.log(message);
          return null;
        },
      });
      return config;
    },
  },
});
