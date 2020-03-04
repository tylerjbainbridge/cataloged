import Bluebird from 'bluebird';
import _ from 'lodash';

import { prisma } from '../data/photon';
import { CollectionEntry } from '@prisma/client';
import { CollectionService } from './CollectionService';

export class ItemService {
  static deleteMany = async (itemIds: string[]) => {
    const items = await prisma.item.findMany({
      where: { id: { in: itemIds } },
      include: {
        note: true,
        file: true,
        link: true,
        googleContact: true,
        labels: true,
        collectionEntries: true,
        collections: true,
      },
    });

    Bluebird.map(items, async item => {
      const relations: { [k: string]: any } = {
        note: item.note,
        file: item.file,
        link: item.link,
        googleContact: item.googleContact,
      };

      await Bluebird.map(
        Object.keys(relations).filter(key => relations[key]),
        (key: string) =>
          // @ts-ignore
          prisma[key].delete({
            where: { id: relations[key].id },
          }),
        { concurrency: 1 },
      );

      await Bluebird.map(
        item.labels,
        (label: any) =>
          prisma.label.update({
            where: { id: label.id },
            data: {
              items: { disconnect: { id: item.id } },
            },
          }),
        { concurrency: 1 },
      );

      await Bluebird.map(
        item.collections,
        (collection: any) =>
          prisma.collection.update({
            where: { id: collection.id },
            data: {
              items: { disconnect: { id: item.id } },
            },
          }),
        { concurrency: 1 },
      );

      await Bluebird.map(
        item.collectionEntries,
        (collectionEntry: any) =>
          prisma.collectionEntry.delete({
            where: { id: collectionEntry.id },
          }),
        { concurrency: 1 },
      );

      // SOFT DELETE
      await prisma.item.update({
        where: { id: item.id },
        data: { deletedAt: new Date() },
      });

      // await prisma.item.delete({
      //   where: { id: item.id },
      // });
    });

    return items;
  };

  static connectOrCreateLabel = async (
    itemId: string,
    userId: string,
    labelName: string,
  ) => {
    const [label] = await prisma.label.findMany({
      first: 1,
      where: { name: labelName },
    });

    const connectArgs = {
      items: { connect: { id: itemId } },
      user: { connect: { id: userId } },
    };

    if (!label) {
      await prisma.label.create({
        data: { name: labelName, ...connectArgs },
      });
    } else {
      await prisma.label.update({
        where: { id: label.id },
        data: connectArgs,
      });
    }

    return await prisma.item.findOne({
      where: { id: itemId },
    });
  };

  static connectLabel = async (itemId: string, labelId: string) => {
    return await prisma.item.update({
      where: { id: itemId },
      data: {
        labels: {
          connect: { id: labelId },
        },
      },
    });
  };

  static disconnectLabel = async (itemId: string, labelId: string) => {
    return await prisma.item.update({
      where: { id: itemId },
      data: {
        labels: {
          disconnect: { id: labelId },
        },
      },
    });
  };

  static addToCollection = async (
    userId: string,
    itemId: string,
    collectionId: string,
  ) => {
    const entry = {} as CollectionEntry;

    _.set(entry, 'item.connect.id', itemId);
    _.set(entry, 'position', 0);
    _.set(entry, 'collection.connect.id', collectionId);

    await prisma.collection.update({
      where: { id: collectionId },
      data: {
        items: { connect: { id: itemId } },
      },
    });

    await CollectionService.insertAtPosition(collectionId, userId, entry);
  };

  static removeFromCollection = async (
    userId: string,
    itemId: string,
    collectionId: string,
  ) => {
    const [entry] = await prisma.collectionEntry.findMany({
      where: {
        item: { id: itemId },
        collection: { id: collectionId },
      },
      first: 1,
    });

    if (!entry) throw new Error('Entry doesnt exist');

    await CollectionService.removeEntry(collectionId, userId, entry.id);
  };
}
