import Teams from '../database/models/teams.model';
import { IAllTeams } from '../interfaces/teams.interface';

export default class TeamsService {
  getAllTeams = async (): Promise<IAllTeams[]> => {
    const teams = await Teams.findAll();
    return teams;
  };
}
