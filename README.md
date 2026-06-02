# Cypress TypeScript E2E & API Framework

[![CI](https://github.com/Eyed-Friaa/cypress-typescript-e2e/actions/workflows/ci.yml/badge.svg)](https://github.com/Eyed-Friaa/cypress-typescript-e2e/actions/workflows/ci.yml)
[![Cypress](https://img.shields.io/badge/Cypress-13-17202C?logo=cypress)](https://www.cypress.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Newman](https://img.shields.io/badge/Newman-Postman-FF6C37?logo=postman&logoColor=white)](https://github.com/postmanlabs/newman)

End-to-end and API test automation framework built with **Cypress** and **TypeScript**, following the Page Object Model, with **Newman/Postman** API testing and a full **GitHub Actions** CI pipeline running across Chrome and Firefox.

---

## Tech Stack

| Layer | Technology |
|---|---|
| E2E Testing | Cypress 13 |
| Language | TypeScript 5 (strict mode) |
| API Testing (in-suite) | Cypress `cy.request` |
| API Testing (collection) | Postman + Newman |
| Reporting | Mochawesome (Cypress) · htmlextra (Newman) |
| CI/CD | GitHub Actions (cross-browser matrix) |
| Linting | ESLint + eslint-plugin-cypress |

---

## Project Structure

```
cypress/
├── e2e/
│   ├── ui/          # login.cy.ts, checkout.cy.ts
│   └── api/         # users.cy.ts, posts.cy.ts (cy.request)
├── pages/           # BasePage + Page Objects (POM, TypeScript)
├── support/         # custom commands (typed), api-types
└── fixtures/        # users.json (data-driven tests)

postman/             # Postman collection + environment (Newman)
.github/workflows/   # CI pipeline
```

---

## Quick Start

```bash
npm install

# Open the interactive Cypress runner
npm run cy:open

# Run everything headless
npm run cy:run

# Run only UI or only API specs
npm run cy:run:ui
npm run cy:run:api

# Run a specific browser
npm run cy:run:chrome
npm run cy:run:firefox

# Run the Postman collection via Newman (HTML report)
npm run test:api:newman

# Type-check without running
npm run type-check
```

---

## What this demonstrates

### Page Object Model in TypeScript
Each page is a typed class extending `BasePage`, returning page instances for fluent chaining (`login().assertLoaded()`). Selectors live in one place per page.

### Typed custom commands
`cy.loginViaUi()` is a reusable, fully-typed custom command that removes login boilerplate from every UI spec — a standard real-world Cypress pattern.

### Two complementary API approaches
- **In-suite** (`cy.request`, typed) — fast API checks living alongside the UI tests.
- **Postman + Newman** — a portable collection with chained requests and JavaScript assertions, runnable in Postman manually or headless in CI. This mirrors how many teams maintain API regression suites separate from their E2E code.

### Cross-browser CI
The pipeline runs the full suite on Chrome and Firefox in parallel, uploads screenshots on failure and videos always, and runs the Newman collection as a separate job with an HTML report artifact.

---

## Targets

- **UI:** [SauceDemo](https://www.saucedemo.com) — a stable public demo shop.
- **API:** [JSONPlaceholder](https://jsonplaceholder.typicode.com) — a stable, auth-free mock API.

Both are public test targets, chosen so the suite runs anywhere without secrets or rate limits.

---

## Author

**Eyed Friaa** — Test Automation Engineer
Cypress · TypeScript · Playwright · Java · CI/CD
Köln, Germany · open to remote & freelance

[GitHub](https://github.com/Eyed-Friaa) · eyedfriaa@yahoo.com
