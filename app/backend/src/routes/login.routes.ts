import { Router } from 'express';
import LoginController from '../controller/user.controller';
import loginMiddleware from '../middlewares/login.middleware';
import validateJWT from '../middlewares/validateJWT.middleware';

const router = Router();
const controller = new LoginController();

router.post('/login', loginMiddleware, controller.login);
router.get('/login/validate', validateJWT, controller.validateJWT);

export default router;
