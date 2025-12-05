type TActiveRotinaJob = {
  cronActiveRotinaOperation: any;
};

export class ActiveRotinaJob {
  cronActiveRotinaOperation: any;
  constructor({ cronActiveRotinaOperation }: TActiveRotinaJob) {
    this.cronActiveRotinaOperation = cronActiveRotinaOperation;
  }
  async run() {
    await this.cronActiveRotinaOperation.execute({});
  }
}

export default ActiveRotinaJob;
