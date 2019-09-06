import { google, plus_v1 } from 'googleapis';
import { OAuth2Client } from 'googleapis-common';
import { Credentials } from 'google-auth-library';
import * as _ from 'lodash';

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

export class GoogleService {
  auth: OAuth2Client;
  plus: plus_v1.Plus;

  constructor(host: string) {
    this.auth = new google.auth.OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      `${host}/google/redirect`,
    );

    this.plus = google.plus({ version: 'v1', auth: this.auth });
  }

  getUrl = () =>
    this.auth.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/plus.me',
        'https://www.googleapis.com/auth/userinfo.email',
      ],
    });

  getAccountFromCode = async (code: string) => {
    const { tokens } = await this.auth.getToken(code);

    this.auth.setCredentials(tokens);

    const me = await this.plus.people.get({ userId: 'me' });

    const userGoogleId = me.data.id;

    const userGoogleEmail = _.get(me, 'data.emails[0].value');

    return {
      id: userGoogleId,
      email: userGoogleEmail,
      tokens: tokens,
    };
  };

  getUserInfo = async (tokens: Credentials) => {
    this.auth.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: this.auth,
      version: 'v2',
    });

    const { data: userInfo } = await oauth2.userinfo.get();

    return userInfo;
  };
}
