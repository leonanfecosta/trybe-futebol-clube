import { Router } from 'express';
import MatchController from '../controller/matches.controller';
import validateJWT from '../middlewares/validateJWT.middleware';

const router = Router();
const controller = new MatchController();

router.get('/matches', controller.getAllMatches);
router.post('/matches', validateJWT, controller.createMatch);

export default router;
