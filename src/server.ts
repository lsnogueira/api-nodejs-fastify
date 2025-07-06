import fastify from 'fastify';

const app = fastify();

app.get('/hello', () => {
  return 'Hello World';
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server Running! ✅');
  })
  .catch((error) => {
    console.error('Error on Start HTTP Server! ❌', error);
  });
