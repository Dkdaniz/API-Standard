import { Router } from 'express';

import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/session', SessionController.store);

routes.use(authMiddleware);

// eslint-disable-next-line no-unused-vars
routes.get('/', (res, req) => {
  res.status(200).json('server on');
});

export default routes;
