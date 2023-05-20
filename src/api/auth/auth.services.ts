import jwt, { Secret } from 'jsonwebtoken';
import { User } from '../users/users.model';

export function createTokens(user: User) {
  const accessToken = jwt.sign({ role: user.role }, process.env.ACCESS_TOKEN_SECRET as Secret, { expiresIn: '20d' });
  return {
    accessToken,
  };
}
