import { Router } from 'express';
import MatchController from '../controller/matches.controller';
import validateJWT from '../middlewares/validateJWT.middleware';

const router = Router();
const controller = new MatchController();

router.get('/matches', controller.getAllMatches);
router.post('/matches', validateJWT, controller.createMatch);
router.patch('/matches/:id/finish', validateJWT, controller.updateMatch);
router.patch('/matches/:id', validateJWT, controller.updateMatchScore);

export default router;
