import Teams from '../database/models/teams.model';
import Matches from '../database/models/matches.model';
import { IMatches } from '../interfaces/matches.interface';
import { IResult } from '../interfaces/result.interface';
import { IScore } from '../interfaces/score.interface';

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

  createMatch = async (data: IMatches): Promise<IResult> => {
    const { homeTeam, awayTeam } = data;
    const homeTeamExists = await Teams.findOne({ where: { id: homeTeam } });
    const awayTeamExists = await Teams.findOne({ where: { id: awayTeam } });

    if (!homeTeamExists || !awayTeamExists) {
      return { code: 404, result: { message: 'There is no team with such id!' },
      };
    }
    if (homeTeam === awayTeam) {
      return { code: 401,
        result: { message: 'It is not possible to create a match with two equal teams' },
      };
    }
    const match = await Matches.create({ ...data, inProgress: true });
    return { code: 201, result: match };
  };

  updateMatch = async (id: number): Promise<object> => {
    await Matches.update({ inProgress: false }, { where: { id } });

    return { message: 'Finished' };
  };

  updateMatchScore = async (id: number, data: IScore): Promise<IResult> => {
    const { homeTeamGoals, awayTeamGoals } = data;
    await Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    return { code: 200, result: { message: 'Score updated' } };
  };
}
