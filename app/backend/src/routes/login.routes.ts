import { Router } from 'express';
import LoginController from '../controller/user.controller';

const router = Router();
const controller = new LoginController();

router.post('/login', controller.login);

export default router;
