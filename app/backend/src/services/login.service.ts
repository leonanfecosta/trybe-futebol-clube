import * as bcrypt from 'bcryptjs';
import createToken from '../helpers/createToken';
import UserModel from '../models/user.model';
import { ILogin } from '../interfaces/user.interface';

export default class LoginService {
  constructor(private model = new UserModel()) {}

  async login({ email, password }: ILogin) {
    const user = await this.model.findOne(email);

    if (!user) {
      return { code: 401, result: { message: 'Incorrect email or password' } };
    }

    const isPasswordCorrect = await bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) {
      return { code: 401, result: { message: 'Incorrect email or password' } };
    }

    const token = createToken({ email: user.email });

    return { code: 200, result: { token } };
  }
}
