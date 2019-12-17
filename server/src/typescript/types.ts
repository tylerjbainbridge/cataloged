import Photon, { User } from '@prisma/photon';
import { GoogleService } from '../services/GoogleService';

export interface Context {
  photon: Photon;
  google: GoogleService;
  user?: User;
}
