import { Hono } from 'hono';
import applicationsRouter from './applications';
import usersRouter from './users';

const adminRouter = new Hono();

// Admin Routes Mounting
adminRouter.route('/applications', applicationsRouter);
adminRouter.route('/users', usersRouter);

export default adminRouter;
