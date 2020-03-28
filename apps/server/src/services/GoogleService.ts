import { google, plus_v1, drive_v3, people_v1 } from 'googleapis';
import { OAuth2Client } from 'googleapis-common';
import { Credentials } from 'google-auth-library';
import * as _ from 'lodash';
import base64url from 'base64url';
import { GoogleAccount } from '@prisma/client';
import { writeFileSync } from 'fs';
import { GoogleContactsService } from './GoogleContactsService';

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

export class GoogleService {
  auth: OAuth2Client;
  plus: plus_v1.Plus;

  constructor(host: string) {
    this.auth = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);

    this.plus = google.plus({ version: 'v1', auth: this.auth });
  }

  getUrl = ({ additionalScopes, loginHint, state }: any = {}) => {
    return this.auth.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/plus.me',
        'https://www.googleapis.com/auth/userinfo.email',
        ...(additionalScopes || []),
      ],
      include_granted_scopes: true,
      ...(state ? { state: base64url(JSON.stringify(state)) } : {}),
      ...(loginHint ? { loginHint } : {}),
    });
  };

  // getAccountFromIdToken = async (idToken: string) => {
  //   const ticket = await this.auth.verifyIdToken({
  //     idToken: idToken,
  //     audience: [
  //       GOOGLE_CLIENT_ID,
  //       '1072260199222-jkrcqtg1friq898g61sgvp4ugp1ddc5o.apps.googleusercontent.com',
  //     ], // Specify the CLIENT_ID of the app that accesses the backend
  //     // Or, if multiple clients access the backend:
  //     //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  //   });

  //   const payload = ticket.getPayload();
  // };

  getAccountFromCode = async (code: string) => {
    const { tokens } = await this.auth.getToken(code);

    this.auth.setCredentials(tokens);
    await this.auth.refreshAccessToken();

    const me = await this.plus.people.get({ userId: 'me' });

    const userGoogleId = me.data.id;

    const userGoogleEmail = _.get(me, 'data.emails[0].value');

    return {
      id: userGoogleId,
      email: userGoogleEmail,
      tokens: tokens,
    };
  };

  getGoogleDriveFiles = async (googleAccount: GoogleAccount) => {
    const { refreshToken, accessToken, expiresAt } = googleAccount;

    this.auth.setCredentials({
      refresh_token: refreshToken,
      access_token: accessToken,
    });

    await this.auth.refreshAccessToken();

    const drive = google.drive({ version: 'v3', auth: this.auth });

    let page = 0;
    let nextPageToken = null;
    let files: drive_v3.Schema$File[] = [];

    while (nextPageToken || page === 0) {
      page++;

      // @ts-ignore
      const { data } = await drive.files.list({
        pageSize: 1000,
        pageToken: nextPageToken,
        fields: 'nextPageToken, files(id, name)',
      });

      console.log(`Fetched page: ${page}`);

      files = [...files, ...data.files];
      nextPageToken = data.nextPageToken;
    }

    console.log('DONE FETCHING FILES', files?.length);
  };

  getGoogleContacts = async (
    googleAccount: GoogleAccount,
    useSyncToken: boolean = true,
  ): Promise<{
    connections: people_v1.Schema$Person[];
    syncToken: string | null;
  }> => {
    const { refreshToken, accessToken } = googleAccount;

    this.auth.setCredentials({
      refresh_token: refreshToken,
      access_token: accessToken,
    });

    await this.auth.refreshAccessToken();

    const service = google.people({ version: 'v1', auth: this.auth });

    const metadata = GoogleContactsService.getMetadata(googleAccount);

    let page = 0;
    let nextPageToken = null;
    let nextSyncToken = null;
    let initialSyncToken = useSyncToken ? metadata?.contactsSyncToken : null;
    let connections: people_v1.Schema$Person[] = [];

    while (nextPageToken || page === 0) {
      page++;

      // @ts-ignore
      const { data } = await service.people.connections.list({
        resourceName: 'people/me',
        pageSize: 2000,
        syncToken: initialSyncToken,
        personFields:
          'names,emailAddresses,phoneNumbers,occupations,organizations,photos,metadata',
        requestSyncToken: true,
      });

      console.log(`Fetched page: ${page}`);

      connections = [...connections, ...(data.connections || [])];
      nextPageToken = data.nextPageToken;
      nextSyncToken = data.nextSyncToken;
    }

    console.log('DONE FETCHING CONTACTS', connections?.length);

    // Debugging results
    // writeFileSync('./temp.json', JSON.stringify({ connections }));

    return {
      connections,
      syncToken: nextSyncToken,
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
