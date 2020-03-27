import { Request } from 'aws-sdk';

export const getHostUrl = (req: any) => {
  return req.get('origin');
};
