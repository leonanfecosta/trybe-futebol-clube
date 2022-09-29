import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

export default class Teams extends Model {
  id!: number;
  teamName!: string;
}

Teams.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  teamName: {
    type: STRING,
    allowNull: false,
    field: 'team_name',
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
  tableName: 'teams',
  underscored: true,
});
