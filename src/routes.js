import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';
import authMidlleware from './app/middlewares/AuthMiddleware';
import adminMidlleware from './app/middlewares/AdminUser';

const routes = new Router();
const upload = multer(multerConfig);
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
// Rota para fazer o upload od avatar do entregador
routes.post('/files', upload.single('file'), FileController.store);
// Rota para cadastrar entregadores
routes.post('/deliverymans', adminMidlleware, DeliverymanController.store);
// Rota para update dos entregadores
routes.put('/deliverymans/:id', adminMidlleware, DeliverymanController.update);
// Rota para lista todos os entregadores
routes.get('/deliverymans', adminMidlleware, DeliverymanController.index);
// Rota para apagar um entregador
routes.delete(
  '/deliverymans/:id',
  adminMidlleware,
  DeliverymanController.delete
);
export default routes;
