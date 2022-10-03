import Teams from '../database/models/teams.model';
import Matches from '../database/models/matches.model';
import { IMatches } from '../interfaces/matches.interface';

export default class MatchesService {
  getAllMatches = async (): Promise<IMatches[]> => {
    const matches = await Matches.findAll({
      include: [
        {
          model: Teams,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: Teams,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });

    return matches;
  };

  getMatchByQuery = async (query: boolean): Promise<IMatches[]> => {
    const matches = await Matches.findAll({
      where: {
        inProgress: query,
      },
      include: [
        {
          model: Teams,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: Teams,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });

    return matches;
  };
}
