export type IValidade = {
  status: string;
};

export abstract class BaseValidateClass<C, U, S> {
  abstract validateCreate(data: C): IValidade;
  abstract validateUpdate(data: U): IValidade;
  abstract validateUpdateStatus(data: S): IValidade;
}
