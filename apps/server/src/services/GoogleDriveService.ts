import { GoogleAccount, Item, GoogleContact, User, File } from '@prisma/client';
import { prisma } from '../data/photon';
import { GoogleService } from './GoogleService';
import _ from 'lodash';
import uuid from 'uuid';

export class GoogleDriveService {
  googleAccount: GoogleAccount;
  user: User;

  constructor(googleAccount: GoogleAccount, user: User) {
    this.googleAccount = googleAccount;
    this.user = user;
  }

  getDataFromFile = (googleFile: any, isNew = true): File => {
    /*
      EXAMPLE
      {
        id: '18NlmbhrtLPe6AwfMO0IGb8jk4xYjslfe',
        name: '42090022.jpg',
        webContentLink: 'https://drive.google.com/uc?id=18NlmbhrtLPe6AwfMO0IGb8jk4xYjslfe&export=download',
        webViewLink: 'https://drive.google.com/file/d/18NlmbhrtLPe6AwfMO0IGb8jk4xYjslfe/view?usp=drivesdk',
        iconLink: 'https://drive-thirdparty.googleusercontent.com/16/type/image/jpeg',
        hasThumbnail: true,
        thumbnailLink: 'https://lh3.googleusercontent.com/TVbG4YYVTAdzR7uJFoB_vpIK3j2hfPhbvRnRaCcAiSoZvsIkZL7VKkJqaCxUaAe3WaMLq23Yb2U=s220',
        createdTime: '2019-04-11T00:37:20.267Z',
        modifiedTime: '2019-04-11T00:37:20.267Z',
        originalFilename: '42090022.jpg',
        fileExtension: 'jpg',
        size: '3731786'
      }
    */

    /*

    createdAt           DateTime       @default(now())
    updatedAt           DateTime       @updatedAt
    extension           String         @default("")
    hasStartedUploading Boolean?
    height              Int?
    isFailed            Boolean?
    isUploaded          Boolean?
    item                Item?
    name                String         @default("")
    size                Int?
    contentType         String?
    title               String         @default("")
    description         String         @default("")
    uploadGroupId       String?
    uploadGroup         UploadGroup?   @relation(fields: [uploadGroupId], references: [id])
    userId              String?
    user                User?          @relation(fields: [userId], references: [id])
    width               Int?
    externalId          String?
    googleAccountId     String?
    googleAccount       GoogleAccount? @relation(fields: [googleAccountId], references: [id])
    metadata            Json?
    */

    const split = (googleFile.name || '').split('.');
    const extension = split.pop();
    const name = split.join('.');

    return {
      name,
      extension,
      externalId: googleFile.id,
      isUploaded: true,
      size: parseInt(googleFile.size),
      contentType: googleFile.mimeType,
      createdAt: new Date(googleFile.createdTime),
      updatedAt: new Date(googleFile.modifiedTime),
      ...(isNew
        ? {
            user: { connect: { id: this.user.id } },
            googleAccount: { connect: { id: this.googleAccount.id } },
            item: {
              create: {
                type: 'file',
                date: new Date(googleFile.createdTime),
                user: { connect: { id: this.user.id } },
              },
            },
          }
        : {}),
      hasStartedUploading: true,
      metadata: JSON.stringify({
        fullImageLink: `https://drive.google.com/uc?export=view&id=${googleFile.id}`,
        webContentLink: googleFile.webContentLink,
        webViewLink: googleFile.webViewLink,
        iconLink: googleFile.iconLink,
        hasThumbnail: googleFile.hasThumbnail,
        thumbnailLink: googleFile.thumbnailLink,
      }),
    };
  };

  static addToMetadata = async (
    googleAccount: GoogleAccount,
    nextMetadata: any,
  ): Promise<any> => {
    let metadata = {};

    try {
      metadata = JSON.parse(googleAccount.metadata);
    } catch (e) {}

    await prisma.googleAccount.update({
      where: { id: googleAccount.id },
      data: {
        metadata: JSON.stringify({ ...metadata, ...nextMetadata }),
      },
    });
  };

  getPage = async ({ googleAccount, ...rest }: any) => {
    let { page = 0, nextPageToken = null, count = 0 } = rest;

    const googleService = new GoogleService();

    googleService.setTokensAndRefresh(googleAccount);

    const drive = googleService.getDrive();

    const fields = [
      'id',
      'name',
      'description',
      'createdTime',
      'modifiedTime',
      'mimeType',
      'size',
      'iconLink',
      'hasThumbnail',
      'thumbnailLink',
      'webContentLink',
      'webViewLink',
      'originalFilename',
      'fileExtension',
      'originalFilename',
    ];

    // @ts-ignore
    const { data } = await drive.files.list({
      pageSize: 1000,
      pageToken: nextPageToken,
      fields: `nextPageToken, files(${fields.join(', ')})`,
      q: "mimeType='image/jpeg'",
    });

    let files = data.files;
    let pageToken = nextPageToken;
    page++;
    nextPageToken = data.nextPageToken;
    count += files.length;

    return {
      files,
      page,
      count,
      pageToken,
      nextPageToken,
    };
  };

  addWebhook = async () => {
    const googleService = new GoogleService();

    googleService.setTokensAndRefresh(this.googleAccount);

    const drive = googleService.getDrive();

    const {
      data: { startPageToken: pageToken },
    } = await drive.changes.getStartPageToken({});

    drive.changes.watch(
      {
        pageToken,
        // resource: {
        // id: uuid.v1(),
        // type: 'web_hook',
        // address: 'https://7def94f6.ngrok.io/notifications',
        // },
      },
      function(err, result) {
        console.log(result);
      },
    );
  };
}
