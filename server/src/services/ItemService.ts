import Bluebird from 'bluebird';

import { photon } from '../data/photon';

export class ItemService {
  static deleteMany = async (itemIds: string[]) => {
    const items = await photon.items.findMany({
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
          photon[`${key}s`].delete({
            where: { id: relations[key].id },
          }),
        { concurrency: 1 },
      );

      await Bluebird.map(
        item.labels,
        (label: any) =>
          photon.labels.update({
            where: { id: label.id },
            data: {
              items: { disconnect: { id: item.id } },
            },
          }),
        { concurrency: 1 },
      );

      await photon.items.delete({
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
    const [label] = await photon.labels.findMany({
      first: 1,
      where: { name: labelName },
    });

    const connectArgs = {
      items: { connect: { id: itemId } },
      user: { connect: { id: userId } },
    };

    if (!label) {
      await photon.labels.create({
        data: { name: labelName, ...connectArgs },
      });
    } else {
      await photon.labels.update({
        where: { id: label.id },
        data: connectArgs,
      });
    }

    return await photon.items.findOne({
      where: { id: itemId },
    });
  };

  static connectLabel = async (itemId: string, labelId: string) => {
    return await photon.items.update({
      where: { id: itemId },
      data: {
        labels: {
          connect: { id: labelId },
        },
      },
    });
  };

  static disconnectLabel = async (itemId: string, labelId: string) => {
    return await photon.items.update({
      where: { id: itemId },
      data: {
        labels: {
          disconnect: { id: labelId },
        },
      },
    });
  };
}
