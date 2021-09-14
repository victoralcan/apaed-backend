import { Router } from 'express';
import authMiddleware from '../middlewares/auth';
import contactsRouter from './contacts.routes';
import localsRouter from './locals.routes';
import usersRouter from './users.routes';
import donorsRouter from './donors.routes';
import donationsRouter from './donations.routes';
import unitsMeasureRouter from './unitsMeasure.routes';
import typesRouter from './types.routes';
import ncmRouter from './ncm.routes';
import productsRouter from './products.routes';
import productLocalDonationRouter from './productLocalDonation.routes';
import { GetSession, CreateSession } from '../services/Session/SessionService';

const routes = Router();

routes.post('/session', CreateSession);

routes.use(authMiddleware);

routes.get('/session', GetSession);

routes.use('/contacts', contactsRouter);

routes.use('/locals', localsRouter);

routes.use('/users', usersRouter);

routes.use('/donors', donorsRouter);

routes.use('/donations', donationsRouter);

routes.use('/units_measure', unitsMeasureRouter);

routes.use('/types', typesRouter);

routes.use('/ncm', ncmRouter);

routes.use('/products', productsRouter);

routes.use('/stock', productLocalDonationRouter);

export default routes;
