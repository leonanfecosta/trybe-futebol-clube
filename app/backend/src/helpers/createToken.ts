import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const secret: string = process.env.JWT_SECRET as string;

const createToken = (payload: object): string => {
  const jwtCongig: object = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const token = jwt.sign(payload, secret, jwtCongig);

  return token;
};

export default createToken;
