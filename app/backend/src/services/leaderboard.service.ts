import { ILeaoderboard, IMacthes } from '../interfaces/leaderbord.interface';
import Matches from '../database/models/matches.model';
import Teams from '../database/models/teams.model';

export default class LeaderBoardService {
  findAllTeams = async () => {
    const homeTeams = await Teams.findAll();
    return homeTeams;
  };

  findAllMatchesHome = async (id: number) => {
    const homeMatches = await Matches.findAll({
      where: {
        homeTeam: id,
        inProgress: false,
      },
    });
    return homeMatches;
  };

  createLeaderBoardHome = (match: IMacthes[]): ILeaoderboard => {
    const totalGames = match.length;
    const totalVictories = match.filter((item) => item.homeTeamGoals > item.awayTeamGoals).length;
    const totalDraws = match.filter((item) => item.homeTeamGoals === item.awayTeamGoals).length;
    const totalLosses = match.filter((item) => item.homeTeamGoals < item.awayTeamGoals).length;
    const goalsFavor = match.reduce((acc, item) => acc + item.homeTeamGoals, 0);
    const goalsOwn = match.reduce((acc, item) => acc + item.awayTeamGoals, 0);
    const goalsBalance = goalsFavor - goalsOwn;
    const totalPoints = totalVictories * 3 + totalDraws;
    const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);

    return { totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency };
  };

  getLeaderBoardHome = async () => {
    const teamsHome = await this.findAllTeams();
    const leaderBoard = await Promise.all(teamsHome.map(async ({ id, teamName }) => {
      const matches = await this.findAllMatchesHome(id);
      const leaderBoardItem = this.createLeaderBoardHome(matches);
      return { name: teamName, ...leaderBoardItem };
    }));
    return leaderBoard;
  };

  findAllMatchesAway = async (id:number) => {
    const awayMatches = await Matches.findAll({
      where: {
        awayTeam: id,
        inProgress: false,
      },
    });
    return awayMatches;
  };

  createLeaderBoardAway = (match: IMacthes[]): ILeaoderboard => {
    const totalGames = match.length;
    const totalVictories = match.filter((item) => item.awayTeamGoals > item.homeTeamGoals).length;
    const totalDraws = match.filter((item) => item.awayTeamGoals === item.homeTeamGoals).length;
    const totalLosses = match.filter((item) => item.awayTeamGoals < item.homeTeamGoals).length;
    const goalsFavor = match.reduce((acc, item) => acc + item.awayTeamGoals, 0);
    const goalsOwn = match.reduce((acc, item) => acc + item.homeTeamGoals, 0);
    const goalsBalance = goalsFavor - goalsOwn;
    const totalPoints = totalVictories * 3 + totalDraws;
    const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);

    return { totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency };
  };

  getLeaderBoardAway = async () => {
    const teamsAway = await this.findAllTeams();
    const leaderBoard = await Promise.all(teamsAway.map(async ({ id, teamName }) => {
      const matches = await this.findAllMatchesAway(id);
      const leaderBoardItem = this.createLeaderBoardAway(matches);
      return { name: teamName, ...leaderBoardItem };
    }));
    return leaderBoard;
  };

  sortLeaderBoard = async (game:string) => {
    const leaderBoard = game === 'home'
      ? await this.getLeaderBoardHome()
      : await this.getLeaderBoardAway();
    const sortedLeaderBoard = leaderBoard.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);
    return sortedLeaderBoard;
  };
}
