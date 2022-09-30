import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import Users from '../database/models/users.model';

dotenv.config();

const secret: string = process.env.JWT_SECRET as string;

const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const { email } = decoded as { email: string };
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }

    res.locals.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validateJWT;
