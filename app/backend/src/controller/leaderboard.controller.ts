import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  constructor(private service = new LeaderboardService()) {}

  getLeaderboard = async (req: Request, res: Response) => {
    const leaderboard = await this.service.sortLeaderBoard();
    return res.status(200).json(leaderboard);
  };
}
