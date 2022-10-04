import * as bcrypt from 'bcryptjs';
import createToken from '../helpers/createToken';
import { ILogin } from '../interfaces/user.interface';
import Users from '../database/models/users.model';

export default class LoginService {
  login = async ({ email, password }: ILogin) => {
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return { code: 401, result: { message: 'Incorrect email or password' } };
    }

    const isPasswordCorrect = await bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) {
      return { code: 401, result: { message: 'Incorrect email or password' } };
    }

    const userInfo = {
      email: user.email,
      role: user.role,
    };

    const token = createToken(userInfo);

    return { code: 200, result: { token } };
  };
}
