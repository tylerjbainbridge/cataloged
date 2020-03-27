import { PrismaClient, User } from '@prisma/client';

import { GoogleService } from '../services/GoogleService';

export interface Context {
  prisma: PrismaClient;
  google: GoogleService;
  user?: User;
}
