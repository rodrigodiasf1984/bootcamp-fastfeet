import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMidlleware from './app/middlewares/AuthMiddleware';

const routes = new Router();
// Rota para criação do utilizador, usando o método store dentro do UserController
routes.post('/users', UserController.store);
// Rota para login
routes.post('/sessions', SessionController.store);
// Usa o authMiddleware globalmente para as rotas posteriores
routes.use(authMidlleware);
// Rota para update do user
routes.put('/users', UserController.update);
export default routes;
