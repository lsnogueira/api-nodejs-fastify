import { app } from './app';
import { env } from './env';

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Running! ✅');
  })
  .catch((error) => {
    console.error('Error on Start HTTP Server! ❌', error);
  });
