import { Router } from 'express';
import TeamController from '../controller/teams.controller';

const router = Router();
const controller = new TeamController();

router.get('/teams', controller.getAllTeams);
router.get('/teams/:id', controller.getTeamById);

export default router;
