import { FastifyInstance } from 'fastify';
import z from 'zod';
import { knex } from '../database';
import crypto from 'node:crypto';

export async function transactionRoutes(app: FastifyInstance) {
  app.post('/', (request, reply) => {
    const transactionSchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['debit', 'credit']),
    });

    const { amount, title, type } = transactionSchema.parse(request.body);

    knex('transactions').insert({
      id: crypto.randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
    });

    return reply.status(201).send();
  });
}
