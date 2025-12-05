import { CmpCompany } from "../../../infrastructure/database/models/CmpCompany";
import { Op, Transaction, Sequelize } from "sequelize";
import { TypeCreateError } from "../../../types";
import { CompanyService } from "src/app/services/CompanyService";
import { UserService } from "src/app/services/user/UserService";
import { CreateUserService } from "src/app/services/user/CreateUserService";
import { validCnpj } from "../../../utils/validCpfOrCnpj";

type CreateCompany = {
  data: object;
  usr_id: number;
  id: number;
};

type createCompanyType = {
  companyService: CompanyService;
  createUserService: CreateUserService;
  userService: UserService;
  db: { sequelize: Sequelize };
  createError: TypeCreateError;
};

export class UpdateCompanyUserOperation {
  private readonly companyService: CompanyService;
  private readonly createUserService: CreateUserService;
  private readonly userService: UserService;
  private readonly db: { sequelize: Sequelize };
  private readonly createError: TypeCreateError;
  constructor({ companyService, createUserService, userService, createError, db }: createCompanyType) {
    this.createUserService = createUserService;
    this.companyService = companyService;
    this.userService = userService;
    this.db = db;
    this.createError = createError;
  }

  public async execute(params: CreateCompany): Promise<CmpCompany> {
    const transaction: Transaction = await this.db.sequelize.transaction();
    try {
      const user = await this.userService.getById({ id: params.usr_id }, transaction);

      const existingCompany = await this.companyService.getOneForParams({ cmp_id: user?.usr_cmp_id }, transaction);
      if (!existingCompany) {
        throw this.createError(400, "Usuário não cadastrado a nenhuma empresa.");
      }

      if(Number(existingCompany.cmp_id) !== Number(params.id)) {
        throw this.createError(400, "Usuário não pertence a empresa informada.");
      }

      const userUpdated = await this.userService.updateById(
        {
          id: params.usr_id,
          data: params.data,
        },
        transaction
      );
      await transaction.commit();
      return userUpdated;
    } catch (err: any) {
      console.log(err);
      await transaction.rollback();
      throw this.createError(
        err.status ?? 500,
        err.message ?? "Ocorreu um erro ao criar a conta. Caso o erro persista entre em contato com o administrador."
      );
    }
  }
}

export default UpdateCompanyUserOperation;
