import { Router } from 'express';

import contactsRouter from './contacts.routes';

const routes = Router();

routes.use('/contacts', contactsRouter);

export default routes;
