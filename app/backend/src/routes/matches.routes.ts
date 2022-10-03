import { Router } from 'express';
import MatchController from '../controller/matches.controller';

const router = Router();
const controller = new MatchController();

router.get('/matches', controller.getAllMatches);

export default router;
