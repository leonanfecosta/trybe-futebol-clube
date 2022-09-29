import Users from '../database/models/users.model';
import { IUser } from '../interfaces/user.interface';

export default class UserModel {
  private _model = Users;

  async findOne(email: string): Promise<IUser | null> {
    const user = await this._model.findOne({ where: { email } });
    return user;
  }
}
