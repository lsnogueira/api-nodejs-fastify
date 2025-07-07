import request from 'supertest';
import { afterAll, beforeAll, describe, it } from 'vitest';
import { app } from '../app';

describe('Transaction routes', () => {
  beforeAll(async () => {
    app.ready();
  });

  afterAll(async () => {
    app.close();
  });

  it('should be able to create a new transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'New Transaction',
        amount: 500,
        type: 'credit',
      })
      .expect(201);
  });
});
