import { GoogleAccount, Item, GoogleContact } from '@prisma/client';
import { prisma } from '../data/photon';
import { GoogleService } from './GoogleService';
import Bluebird = require('bluebird');
import { people_v1 } from 'googleapis';
import _ from 'lodash';
import { Context } from '../typescript/types';
import { ItemService } from './ItemService';

export class GoogleContactsService {
  googleAccount: GoogleAccount;
  context: Context;

  constructor(context: Context, googleAccount: GoogleAccount) {
    this.context = context;
    this.googleAccount = googleAccount;
  }

  static findPrimary = (options: any, asIndex = false) =>
    (options || [])[asIndex ? 'findIndex' : 'find'](
      (option: any) => option?.metadata?.primary && !option.default,
    );

  static findOthers = (options: any) =>
    (options || []).filter(
      (option: any) => !option?.metadata?.primary && !option.default,
    );

  static getDataFromConnection = (connection: people_v1.Schema$Person): any => {
    const data: any = {};

    data.resourceName = connection.resourceName;

    const date = new Date(_.get(connection, 'metadata.sources[0].updateTime'));
    const isDeleted = !!_.get(connection, 'metadata.deleted', false);

    data.name = GoogleContactsService.findPrimary(
      connection.names,
    )?.displayName;

    data.email = GoogleContactsService.findPrimary(
      connection.emailAddresses,
    )?.value;

    _.set(
      data,
      'otherEmails.set',
      GoogleContactsService.findOthers(connection.emailAddresses).map(
        ({ value }: any) => value,
      ),
    );

    data.phoneNumber = GoogleContactsService.findPrimary(
      connection.phoneNumbers,
    )?.value;

    _.set(
      data,
      'otherPhoneNumbers.set',
      GoogleContactsService.findOthers(connection.phoneNumbers).map(
        ({ value }: any) => value,
      ),
    );

    const organization = GoogleContactsService.findPrimary(
      connection.organizations,
    );

    data.companyTitle = organization?.title;
    data.companyName = organization?.name;

    data.photoUrl =
      GoogleContactsService.findPrimary(connection.photos)?.url || null;

    return { date, isDeleted, data };
  };

  static getMetadata = (googleAccount: GoogleAccount): any => {
    let metadata = {};

    try {
      metadata = JSON.parse(googleAccount.metadata);
    } catch (e) {}

    return metadata;
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

  importGoogleContacts = async () => {
    const {
      connections,
      syncToken,
    } = await this.context.google.getGoogleContacts(this.googleAccount);

    const items = await Bluebird.map(
      connections,
      async (connection: people_v1.Schema$Person) => {
        const {
          data,
          date,
          isDeleted,
        } = GoogleContactsService.getDataFromConnection(connection);

        const [
          existingContact,
        ] = await this.context.prisma.googleContact.findMany({
          where: { resourceName: data.resourceName },
          include: { item: true },
        });

        if (existingContact) {
          if (isDeleted) {
            // Deleting contact
            await ItemService.deleteMany([existingContact?.item?.id]);
            return;
          }

          await this.context.prisma.googleContact.updateMany({
            where: { resourceName: data.resourceName },
            data: data,
          });

          return;
        } else if (isDeleted) {
          // Skip
          return;
        }

        await this.context.prisma.googleContact.create({
          data: {
            ...data,
            user: { connect: { id: this.context.user.id } },
            googleAccount: { connect: { id: this.googleAccount.id } },
            item: {
              create: {
                type: 'googleContact',
                date,
                user: { connect: { id: this.context.user.id } },
              },
            },
          },
        });

        return;
      },
      { concurrency: 50 },
    );

    await GoogleContactsService.addToMetadata(this.googleAccount, {
      contactsSyncToken: syncToken,
    });

    console.log(
      `Created/Updated/Deleted ${items?.length} items from google contacts`,
    );

    return items;
  };
}
