import { User } from '../../support/api-types';

/**
 * User API tests using Cypress's built-in cy.request against
 * JSONPlaceholder. Demonstrates typed responses, status/schema checks,
 * and a clean separation from the UI specs.
 */
describe('API › Users', () => {
  const apiUrl = Cypress.env('apiUrl') as string;

  it('GET /users returns a non-empty list of valid users', () => {
    cy.request<User[]>('GET', `${apiUrl}/users`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.an('array').and.not.be.empty;

      const first = res.body[0];
      expect(first).to.have.all.keys(
        'id',
        'name',
        'username',
        'email',
        'address',
        'phone',
        'website',
        'company'
      );
      expect(first.email).to.contain('@');
    });
  });

  it('GET /users/:id returns the correct user', () => {
    cy.request<User>('GET', `${apiUrl}/users/2`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.id).to.eq(2);
      expect(res.body.name).to.be.a('string').and.not.be.empty;
      expect(res.body.email).to.contain('@');
    });
  });

  it('GET /users/:id with a non-existent id returns 404', () => {
    cy.request({
      method: 'GET',
      url: `${apiUrl}/users/9999`,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(404);
    });
  });

  it('every user in the list has a valid email and positive id', () => {
    cy.request<User[]>('GET', `${apiUrl}/users`).then((res) => {
      res.body.forEach((user) => {
        expect(user.id, 'id').to.be.greaterThan(0);
        expect(user.email, 'email').to.contain('@');
        expect(user.name, 'name').to.not.be.empty;
      });
    });
  });
});
