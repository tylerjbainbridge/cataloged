import Queue, { QueueOptions } from 'bull';

export class WorkerQueue extends Queue {
  constructor(name: string, opts?: QueueOptions) {
    super(name, {
      ...opts,
      redis: process.env.REDIS_URL,
    });
  }

  init() {
    this.on('completed', job => {
      console.log(`${this.name}: Job with id ${job.id} has been completed`);
    });

    this.on('error', error => {
      console.log(`${this.name}: error`, error);
    });

    this.on('waiting', jobId => {
      console.log(`${this.name}: Job:${jobId} - waiting `);
    });

    this.on('active', job => {
      console.log(`${this.name}: Job:${job.id} - active `);
    });

    this.on('stalled', job => {
      console.log(`${this.name}: Job:${job.id} - stalled `);
    });

    this.on('completed', (job, result) => {
      // A job successfully completed with a `result`.
    });

    this.on('failed', (job, err) => {
      // A job failed with reason `err`!
      console.log(`${this.name}: Job:${job.id} - failed `, err);
    });
  }
}
