import { Router } from 'express';
import LeaderboardController from '../controller/leaderboard.controller';

const router = Router();
const controller = new LeaderboardController();

router.get('/leaderboard/home', controller.getLeaderboard);

export default router;
