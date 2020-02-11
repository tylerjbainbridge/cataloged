import Bluebird from 'bluebird';

import { prisma } from '../data/photon';

export class ItemService {
  static deleteMany = async (itemIds: string[]) => {
    const items = await prisma.item.findMany({
      where: { id: { in: itemIds } },
      include: {
        note: true,
        file: true,
        link: true,
        labels: true,
      },
    });

    Bluebird.map(items, async item => {
      const relations: { [k: string]: any } = {
        note: item.note,
        file: item.file,
        link: item.link,
      };

      await Bluebird.map(
        Object.keys(relations).filter(key => relations[key]),
        (key: string) =>
          // @ts-ignore
          prisma[`${key}s`].delete({
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

      await prisma.item.delete({
        where: { id: item.id },
      });
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
}
