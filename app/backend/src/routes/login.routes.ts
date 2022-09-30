import { Router } from 'express';
import LoginController from '../controller/user.controller';
import loginMiddleware from '../middlewares/login.middleware';

const router = Router();
const controller = new LoginController();

router.post('/login', loginMiddleware, controller.login);

export default router;
