import { Request, Response } from 'express';
import LoginService from '../services/user.service';
import { ILogin } from '../interfaces/user.interface';

export default class LoginController {
  constructor(private service = new LoginService()) {}

  login = async (req: Request, res: Response) => {
    const user = req.body as ILogin;
    const { code, result } = await this.service.login(user);

    if (code === 401) {
      return res.status(code).json(result);
    }

    return res.status(code).json({ token: result.token });
  };
}
