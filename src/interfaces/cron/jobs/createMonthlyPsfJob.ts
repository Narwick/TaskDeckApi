export class createMonthlyPsfJob {
  createMonthlyPsfJobOperation: any;
  constructor({ createMonthlyPsfJobOperation }: any) {
    this.createMonthlyPsfJobOperation = createMonthlyPsfJobOperation;
  }
  async run() {
    await this.createMonthlyPsfJobOperation.execute({});
  }
}

export default createMonthlyPsfJob;
