import { Request, Response } from 'express';
import MatchService from '../services/matches.service';

export default class MatchController {
  constructor(private service = new MatchService()) {}

  getAllMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress) {
      const matches = await this.service.getMatchByQuery(inProgress === 'true');
      return res.status(200).json({ matches });
    }
    const matches = await this.service.getAllMatches();
    return res.status(200).json(matches);
  };

  createMatch = async (req: Request, res: Response) => {
    const { code, result } = await this.service.createMatch(req.body);
    return res.status(code).json(result);
  };

  updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const match = await this.service.updateMatch(Number(id));
    return res.status(200).json(match);
  };

  updateMatchScore = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { code, result } = await this.service.updateMatchScore(Number(id), req.body);
    return res.status(code).json(result);
  };
}
