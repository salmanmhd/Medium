import { Hono, HonoRequest } from 'hono';
import { cors } from 'hono/cors';
import userRouter from './routes/user';
import blogRouter from './routes/blog';

const app = new Hono();
app.use('/api/*', cors());
app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);
app.get('/', (c) => c.text('Hello World!'));

export default app;
