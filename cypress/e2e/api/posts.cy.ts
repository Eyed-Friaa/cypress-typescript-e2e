import { Post, CreatePostRequest } from '../../support/api-types';

/**
 * Posts API tests — full CRUD against JSONPlaceholder.
 * Note: JSONPlaceholder fakes writes (POST/PUT/DELETE return realistic
 * status codes and echo the payload, but nothing persists).
 */
describe('API › Posts (CRUD)', () => {
  const apiUrl = Cypress.env('apiUrl') as string;

  it('POST /posts creates a post and returns 201 with an id', () => {
    const payload: CreatePostRequest = {
      title: 'QA automation portfolio',
      body: 'Created via Cypress cy.request',
      userId: 1,
    };

    cy.request<Post>('POST', `${apiUrl}/posts`, payload).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body.title).to.eq(payload.title);
      expect(res.body.body).to.eq(payload.body);
      expect(res.body.userId).to.eq(payload.userId);
      expect(res.body.id).to.be.a('number');
    });
  });

  it('PUT /posts/:id updates a post and returns 200', () => {
    const payload: CreatePostRequest = {
      title: 'Updated title',
      body: 'Updated body',
      userId: 1,
    };

    cy.request<Post>('PUT', `${apiUrl}/posts/1`, payload).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.title).to.eq('Updated title');
    });
  });

  it('DELETE /posts/:id returns 200', () => {
    cy.request('DELETE', `${apiUrl}/posts/1`).then((res) => {
      expect(res.status).to.eq(200);
    });
  });

  it('GET /posts/:id/comments returns comments tied to the post', () => {
    cy.request<{ postId: number; email: string }[]>(
      'GET',
      `${apiUrl}/posts/1/comments`
    ).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.an('array').and.not.be.empty;
      res.body.forEach((comment) => {
        expect(comment.postId).to.eq(1);
        expect(comment.email).to.contain('@');
      });
    });
  });
});
