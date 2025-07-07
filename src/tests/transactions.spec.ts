import request from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { app } from '../app';
import { execSync } from 'node:child_process';

describe('Transaction routes', () => {
  beforeAll(async () => {
    app.ready();
  });

  afterAll(async () => {
    app.close();
  });

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all');
    execSync('npm run knex migrate:latest');
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

  it('shoulde be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New Transaction',
        amount: 500,
        type: 'credit',
      })
      .expect(201);

    const cookie = createTransactionResponse.get('Set-Cookie');
    const listAllTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookie!)
      .expect(200);

    expect(listAllTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New Transaction',
        amount: 500,
      }),
    ]);
  });

  it('shoulde be able to list specific transaction', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New Transaction',
        amount: 500,
        type: 'credit',
      })
      .expect(201);

    const cookie = createTransactionResponse.get('Set-Cookie');
    const listAllTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookie!)
      .expect(200);

    const transactionId = listAllTransactionsResponse.body.transactions[0].id;

    const getTransactionResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookie!)
      .expect(200);

    expect(getTransactionResponse.body.transaction).toEqual(
      expect.objectContaining({
        title: 'New Transaction',
        amount: 500,
      })
    );
  });

  it('shoulde be able to get summary', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New Transaction',
        amount: 500,
        type: 'credit',
      })
      .expect(201);

    const cookie = createTransactionResponse.get('Set-Cookie');

    await request(app.server)
      .post('/transactions')
      .set('Cookie', cookie!)
      .send({
        title: 'New Transaction',
        amount: 300,
        type: 'debit',
      })
      .expect(201);

    const summaryResponse = await request(app.server)
      .get('/transactions/summary')
      .set('Cookie', cookie!)
      .expect(200);

    expect(summaryResponse.body.summary).toEqual({
      amount: 200,
    });
  });
});
