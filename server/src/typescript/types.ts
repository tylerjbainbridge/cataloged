import Photon, { User } from '@prisma/client';
import { GoogleService } from '../services/GoogleService';

export interface Context {
  photon: Photon;
  google: GoogleService;
  user?: User;
}
