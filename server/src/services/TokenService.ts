import * as jwt from 'jsonwebtoken';

import { User } from '@prisma/client';
import { prisma } from '../data/photon';

export interface Payload {
  id: User['id'];
}

export class TokenService {
  static getTokenFromUser(user: User): string {
    const payload: Payload = { id: user.id };

    return jwt.sign(payload, process.env.JWT_SECRET);
  }

  static async getUserFromToken(token: string): Promise<User> {
    const result = jwt.verify(token, process.env.JWT_SECRET);

    const { id: userId }: Payload =
      typeof result === 'string' ? JSON.parse(result) : result;

    const user = await prisma.user.findOne({ where: { id: userId } });

    return user;
  }
}
