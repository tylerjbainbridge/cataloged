import { User } from '@prisma/photon';

import { TokenService } from '../services/TokenService';

export const getUserFromRequest = async (req: any): Promise<User | null> => {
  if (!req.headers) return null;

  const authorization = req.headers.authorization;
  const { token: jwt } = req.query;

  let user = null;

  if (!authorization && !jwt) {
    return user;
  }

  const token = jwt ? jwt : authorization.replace('JWT ', '');

  try {
    user = await TokenService.getUserFromToken(token);
  } catch (e) {}

  return user;
};
