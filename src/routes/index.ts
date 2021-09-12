import { Router } from 'express';
import authMiddleware from '../middlewares/auth';
import contactsRouter from './contacts.routes';
import localsRouter from './locals.routes';
import usersRouter from './users.routes';
import donorsRouter from './donors.routes';
import { GetSession, CreateSession } from '../services/Session/SessionService';

const routes = Router();

routes.post('/session', CreateSession);

routes.use(authMiddleware);

routes.get('/session', GetSession);

routes.use('/contacts', contactsRouter);

routes.use('/locals', localsRouter);

routes.use('/users', usersRouter);

routes.use('/donors', donorsRouter);

export default routes;
