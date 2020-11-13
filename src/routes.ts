import { Router } from 'express';
import multer from 'multer';

import UserController from './controllers/UserController';
import ProductController from './controllers/ProductController';

import uploadConfig from './config/upload';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);

routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.show);
routes.post('/products', upload.array('images'), ProductController.create);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.delete);

export default routes;