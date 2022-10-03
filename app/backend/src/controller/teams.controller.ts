import { Request, Response } from 'express';
import TeamService from '../services/teams.service';

export default class TeamController {
  constructor(private service = new TeamService()) {}

  getAllTeams = async (req: Request, res: Response) => {
    const teams = await this.service.getAllTeams();
    return res.status(200).json(teams);
  };

  getTeamById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await this.service.getTeamById(Number(id));
    return res.status(200).json(team);
  };
}
