import { Router } from 'express';

import UserController from './controllers/UserController';
import ProductController from './controllers/ProductController';

const routes = Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);

routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.show);
routes.post('/products', ProductController.create);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.delete);

export default routes;