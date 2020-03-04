import Bluebird from 'bluebird';
import { CollectionEntry, Collection, User } from '@prisma/client';
import { prisma } from '../data/photon';

export class CollectionService {
  static deleteCollection = async (
    collectionId: Collection['id'],
    userId: User['id'],
  ) => {
    const [collection] = await prisma.collection.findMany({
      where: { id: collectionId, user: { id: userId } },
      include: { entries: true },
      first: 1,
    });

    if (!collection) throw new Error('collection doesnt exist');

    await Bluebird.map(
      // @ts-ignore
      collection.entries,
      async entry => {
        return await CollectionService.removeEntry(
          collectionId,
          userId,
          entry.id,
          false,
        );
      },
      { concurrency: 5 },
    );

    await prisma.collection.delete({
      where: { id: collectionId },
    });
  };

  static removeEntry = async (
    collectionId: Collection['id'],
    userId: User['id'],
    entryId: CollectionEntry['id'],
    updatePositions = true,
  ) => {
    const [entry] = await prisma.collectionEntry.findMany({
      where: {
        id: entryId,
        collection: {
          id: collectionId,
        },
        user: {
          id: userId,
        },
      },
      include: {
        block: true,
        item: true,
      },
      first: 1,
    });

    if (!entry) throw new Error('Entry doesnt exist');

    if (entry.block) {
      await prisma.collectionBlock.delete({
        where: { id: entry.block.id },
      });
    } else if (entry.item) {
      await prisma.collection.update({
        where: { id: collectionId },
        data: {
          items: {
            disconnect: { id: entry.item.id },
          },
        },
      });
    }

    await prisma.collectionEntry.delete({
      where: { id: entry.id },
    });

    const { entries } = await prisma.collection.findOne({
      where: { id: collectionId },
      include: {
        entries: { orderBy: { position: 'asc' } },
      },
    });

    if (updatePositions) {
      await CollectionService.updatePositions(
        collectionId,
        entries.map((entry, idx) => ({
          ...entry,
          position: idx + 1,
        })),
      );
    }
  };

  static insertAtPosition = async (
    collectionId: Collection['id'],
    userId: User['id'],
    entry: CollectionEntry,
  ) => {
    await CollectionService.moveEntriesDownFromPosition(
      collectionId,
      entry.position,
    );

    await prisma.collectionEntry.create({
      data: {
        ...entry,
        user: {
          connect: {
            id: userId,
          },
        },
        collection: {
          connect: {
            id: collectionId,
          },
        },
      },
    });
  };

  static updatePositions = async (
    collectionId: string,
    entries: { id: string; position: number }[],
  ) => {
    await Bluebird.map(
      // @ts-ignore
      entries,
      async ({ id, position }: any) => {
        return await prisma.collectionEntry.update({
          where: { id },
          data: {
            position,
          },
        });
      },
      { concurrency: 5 },
    );
  };

  static moveToPosition = async (
    collectionId: Collection['id'],
    entryId: CollectionEntry['id'],
    position: number,
  ) => {
    await CollectionService.moveEntriesDownFromPosition(collectionId, position);

    await prisma.collectionEntry.update({
      where: {
        id: entryId,
      },
      data: {
        position,
      },
    });
  };

  static moveEntriesDownFromPosition = async (
    collectionId: Collection['id'],
    position: number,
  ) => {
    const { entries } = await prisma.collection.findOne({
      where: { id: collectionId },
      include: {
        entries: true,
      },
    });

    await Bluebird.map(
      // @ts-ignore
      entries,
      async (entry: CollectionEntry) => {
        if (entry.position >= position) {
          return await prisma.collectionEntry.update({
            where: { id: entry.id },
            data: {
              position: entry.position + 1,
            },
          });
        }

        return entry;
      },
      { concurrency: 5 },
    );
  };

  static moveEntriesUpFromPosition = async (
    collectionId: Collection['id'],
    position: number,
  ) => {
    const { entries } = await prisma.collection.findOne({
      where: { id: collectionId },
      include: {
        entries: true,
      },
    });

    await Bluebird.map(
      // @ts-ignore
      entries,
      async (entry: CollectionEntry) => {
        if (entry.position <= position) {
          return await prisma.collectionEntry.update({
            where: { id: entry.id },
            data: {
              position: entry.position - 1,
            },
          });
        }

        return entry;
      },
      { concurrency: 5 },
    );
  };
}
