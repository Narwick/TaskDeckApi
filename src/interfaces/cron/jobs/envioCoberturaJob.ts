export class envioCoberturaJob {
  envioCoberturaJobOperation: any;
  constructor({ envioCoberturaJobOperation }: any) {
    this.envioCoberturaJobOperation = envioCoberturaJobOperation;
  }

  async run() {
    await this.envioCoberturaJobOperation.execute({});
  }
}

export default envioCoberturaJob;
