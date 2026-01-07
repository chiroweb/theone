import { Hono } from 'hono';
import applicationsRoutes from './applications';
import usersRoutes from './users';
// import postsRoutes from './posts';
// import insightsRoutes from './insights';

const app = new Hono();

// Admin Routes Mounting
app.route('/applications', applicationsRoutes);
app.route('/users', usersRoutes);
// app.route('/posts', postsRoutes);
// app.route('/insights', insightsRoutes);

export default app;
