import { Request, Response, NextFunction } from 'express';
import { ILogin } from '../interfaces/user.interface';

export default (req: Request, res: Response, next: NextFunction) => {
  const user = req.body as ILogin;

  if (!user.email || !user.password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(user.email)) {
    return res.status(400).json({ message: 'Incorrect email or password' });
  }

  next();
};
