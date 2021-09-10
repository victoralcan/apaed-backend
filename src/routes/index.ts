import { Router } from 'express';
import authMiddleware from '../middlewares/auth';
import contactsRouter from './contacts.routes';
import { GetSession, CreateSession } from '../services/Session/SessionService';

const routes = Router();

routes.post('/session', CreateSession);

routes.use(authMiddleware);

routes.get('/session', GetSession);

routes.use('/contacts', contactsRouter);

export default routes;
