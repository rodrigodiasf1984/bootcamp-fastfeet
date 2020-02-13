import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import authMidlleware from './app/middlewares/AuthMiddleware';

const routes = new Router();
// Rota para criação do utilizador, usando o método store dentro do UserController
routes.post('/users', UserController.store);
// Rota para login
routes.post('/sessions', SessionController.store);
// Usa o authMiddleware globalmente para as rotas posteriores "se o user não estiver logado o mesmo não consegue acessar as rotas abaixo"
routes.use(authMidlleware);
// Rota para update do user
routes.put('/users', UserController.update);
// Rota para criar novo destinatário
routes.post('/recipients', RecipientController.store);
// Rota para atualizar o destinatário
routes.put('/recipients/:id', RecipientController.update);
export default routes;
