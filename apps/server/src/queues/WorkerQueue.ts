import Queue, { QueueOptions } from 'bull';

export class WorkerQueue extends Queue {
  constructor(name: string, opts?: QueueOptions) {
    super(name, {
      ...opts,
      redis: process.env.REDIS_URL,
    });

    this.addListeners();
  }

  log(str: string, ...args: any[]) {
    console.log(`${this.name}: ${str}`, ...args);
  }

  addListeners() {
    this.on('completed', job => {
      this.log(`Job with id ${job.id} has been completed`);
    });

    this.on('error', error => {
      this.log(`error`, error);
    });

    this.on('waiting', jobId => {
      this.log(`Job:${jobId} - waiting `);
    });

    this.on('active', job => {
      this.log(`Job:${job.id} - active `);
    });

    this.on('stalled', job => {
      this.log(`Job:${job.id} - stalled `);
    });

    this.on('completed', (job, result) => {
      // A job successfully completed with a `result`.
    });

    this.on('failed', (job, err) => {
      // A job failed with reason `err`!
      this.log(`Job:${job.id} - failed `, err);
    });
  }
}
