import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import { signInSchema, signUpSchema } from '@dev.salman010/medium-common';

const user = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

user.post('/signup', async (c) => {
  const body = await c.req.json();
  const { success } = signUpSchema.safeParse(body);
  const { email, password, name } = body;
  if (!success) {
    c.status(400);
    return c.json({
      msg: 'Invalid request, bad input',
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const res = await prisma.user.create({
      data: {
        email,
        password,
        name: name || null,
      },
    });

    const jwt = await sign(
      {
        id: res.id,
      },
      c.env.JWT_SECRET
    );
    return c.json({
      msg: 'Sing up successfull',
      jwt,
      res,
    });
  } catch (error) {
    console.log(`error signup: ${error}`);
    c.status(411);
    return c.text('User already exist, use different email please');
  }
});

user.post('/signin', async (c) => {
  const body = await c.req.json();
  const { success } = signInSchema.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({
      msg: 'Invalid request, bad input',
    });
  }

  const { email, password } = body;

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({
        msg: "User doesn't exist",
      });
    }

    const jwt = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET
    );
    c.status(200);
    return c.json({
      msg: 'Sign is successfull',
      jwt,
      user,
    });
  } catch (error) {
    c.status(411);
    console.log(`error sign in: ${error}`);
    return c.text("User doesn't exist, use different email please");
  }
});

export default user;
