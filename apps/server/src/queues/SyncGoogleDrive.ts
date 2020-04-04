import { WorkerQueue } from './WorkerQueue';

const SyncGoogleDrive = new WorkerQueue('SyncGoogleDrive');

SyncGoogleDrive.process(async job => {
  console.log('processing job', job.data);

  return;
});

export { SyncGoogleDrive };
