import { File, User } from '@prisma/client';

import { AWSService, s3 } from '../services/AWSService';
import { getS3Key, KEY_TYPES } from '../helpers/files';

import { prisma } from '../data/photon';
import { WorkerQueue } from './WorkerQueue';

export interface ProcessFileJobData {}

const ProcessFile = new WorkerQueue('ProcessFile');

ProcessFile.process(5, async job => {
  const file: File = job.data.file;
  const user: User = job.data.user;

  try {
    if (file.contentType.split('/').shift() !== 'image') {
      return await prisma.file.update({
        where: { id: file.id },
        data: { hasStartedUploading: true, isUploaded: true },
      });
    }

    await prisma.file.update({
      where: { id: file.id },
      data: { hasStartedUploading: true },
    });

    const stream = s3
      .getObject({
        Key: getS3Key(user, file, KEY_TYPES.original),
        Bucket: process.env.AWS_S3_BUCKET,
      })
      .createReadStream();

    await AWSService.uploadImage(stream, user, file);

    await prisma.file.update({
      where: { id: file.id },
      data: {
        isUploaded: true,
      },
    });

    return file;
  } catch (e) {
    console.log(e);

    if (file) {
      await prisma.file.update({
        where: { id: file.id },
        data: {
          isFailed: true,
        },
      });
    }

    throw e;

    return null;
  }
});

export { ProcessFile };
