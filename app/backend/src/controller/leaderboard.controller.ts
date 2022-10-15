import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  constructor(private service = new LeaderboardService()) {}

  getLeaderboardHome = async (req: Request, res: Response) => {
    const leaderboard = await this.service.sortLeaderBoard('home');
    return res.status(200).json(leaderboard);
  };

  getLeaderboardAway = async (req: Request, res: Response) => {
    const leaderboard = await this.service.sortLeaderBoard('away');
    return res.status(200).json(leaderboard);
  };
}
