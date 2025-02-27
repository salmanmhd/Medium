import { Hono, HonoRequest } from 'hono';

const app = new Hono().basePath('/api/v1');

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.post('/user/signup', async (c) => {
  return c.text('signup');
});

app.post('/user/signin', async (c) => {
  return c.text('signin');
});

app.post('/blog', async (c) => {
  return c.text('blog post');
});

app.put('/blog', async (c) => {
  return c.text('update blog');
});

app.get('/blog/:id', async (c) => {
  const params = c.req.param();
  return c.text(`get blog by ids, params: ${JSON.stringify(params)}`);
});

app.get('/blogs/bulk', async (c) => {
  return c.text('get bulk blogs');
});

export default app;
