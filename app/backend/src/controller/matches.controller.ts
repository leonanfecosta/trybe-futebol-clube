import { Request, Response } from 'express';
import MatchService from '../services/matches.service';

export default class MatchController {
  constructor(private service = new MatchService()) {}

  getAllMatches = async (req: Request, res: Response) => {
    const matches = await this.service.getAllMatches();
    return res.status(200).json(matches);
  };
}
