import { WorkerQueue } from './WorkerQueue';
import { GoogleService } from '../services/GoogleService';
import { drive_v3 } from 'googleapis';
import { map } from 'bluebird';
import { prisma } from '../data/photon';
import { GoogleDriveService } from '../services/GoogleDriveService';

const SyncGoogleDrive = new WorkerQueue('SyncGoogleDrive');

SyncGoogleDrive.process(10, async job => {
  const { googleAccount, user } = job.data;

  SyncGoogleDrive.log(
    `Fetching page: ${job.data.page || 0} - Count: ${job.data.count || 0}`,
  );

  const googleDriveService = new GoogleDriveService(googleAccount, user);

  let {
    page,
    nextPageToken,
    count,
    files,
    pageToken,
  } = await googleDriveService.getPage(job.data);

  if (nextPageToken) {
    await SyncGoogleDrive.add({
      user,
      googleAccount,
      page,
      nextPageToken,
      count,
    });
  } else {
    await GoogleDriveService.addToMetadata(googleAccount, {
      googleDrivePageToken: pageToken,
    });

    console.log(`DONE FETCHING FILES (${count})`);
  }

  await map(
    files,
    async (file: any) => {
      const [existingFile] = await prisma.file.findMany({
        where: { externalId: file.id },
        first: 1,
      });

      let data = googleDriveService.getDataFromFile(file, !existingFile);

      if (existingFile) {
        await prisma.file.updateMany({
          where: { externalId: file.id },
          data,
        });
      } else {
        await prisma.file.create({
          data,
        });
      }
    },
    { concurrency: 1 },
  );
});

export { SyncGoogleDrive };
