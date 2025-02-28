import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

const blog = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

blog.get('/', (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  return c.text('Hello Hono!');
});

blog.post('/', async (c) => {
  return c.text('blog post');
});

blog.put('/', async (c) => {
  return c.text('update blog');
});

blog.get('/:id', async (c) => {
  const params = c.req.param();
  return c.text(`get blog by ids, params: ${JSON.stringify(params)}`);
});

blog.get('/blogs', async (c) => {
  return c.text('get bulk blogs');
});

export default blog;
