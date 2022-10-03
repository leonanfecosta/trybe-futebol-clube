import Teams from '../database/models/teams.model';
import { ITeams } from '../interfaces/teams.interface';

export default class TeamsService {
  getAllTeams = async (): Promise<ITeams[]> => {
    const teams = await Teams.findAll();
    return teams;
  };

  getTeamById = async (id: number): Promise<ITeams | null > => {
    const team = await Teams.findByPk(id);
    return team;
  };
}
