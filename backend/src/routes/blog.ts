import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from 'hono/jwt';
import {
  createBlogSchema,
  updateBlogSchema,
} from '@dev.salman010/medium-common';
const blog = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blog.use('*', async (c, next) => {
  const authHeaders = c.req.header('Authorization') || '';

  try {
    const user = await verify(authHeaders, c.env.JWT_SECRET);
    console.log(user);
    if (user) {
      c.set('userId', user.id as string);
      await next();
    }
  } catch (error) {
    c.status(403);
    return c.json({
      msg: 'You are not authorized',
      error,
    });
  }
});

blog.post('/', async (c) => {
  const body = await c.req.json();
  const { success } = createBlogSchema.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({
      msg: 'Invalid request, bad input',
    });
  }
  const userId = c.get('userId');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const res = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });
    c.status(200);
    return c.json({
      msg: 'blog created successfully',
      res,
    });
  } catch (error) {
    console.log(error);
    c.status(400);
    return c.json({
      msg: 'there were some problem while creating blog',
      error,
    });
  }
});

blog.put('/', async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const res = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    c.status(200);
    return c.json({
      msg: 'blog updated successfully',
      res,
    });
  } catch (error) {
    console.log(error);
    c.status(400);
    return c.json({
      msg: 'there were some problem while creating blog',
      error,
    });
  }
});

blog.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.post.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return c.json({
      msg: 'Bulk Blog fetched successfully',
      res: blogs,
    });
  } catch (error) {
    console.log(error);
    c.status(400);
    c.json({
      msg: 'Something went wrong while fetching the bulk blogs',
      error,
    });
  }
});

blog.get('/:id', async (c) => {
  const id = c.req.param('id');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findFirst({
      where: {
        id,
      },
    });

    return c.json({
      msg: 'Blog fetched successfully',
      res: blog,
    });
  } catch (error) {
    console.log(error);
    c.status(400);
    c.json({
      msg: 'Something went wrong while fetching the blogs',
      error,
    });
  }
});

export default blog;
