import { BaseService } from "./BaseService";
import { TypeCreateError } from "../../types";
import { LeaLearnings } from "../../infrastructure/database/models/LeaLearnings";
import { LearningsRepository } from "src/infrastructure/database/repository/Learnings/LearningsRepository";
import { Transaction } from "sequelize";

export interface ILearningsService {
  learningsRepository: LearningsRepository;
  createError: TypeCreateError;
}
export class LearningsService extends BaseService<LeaLearnings, LearningsRepository> {
  constructor({ learningsRepository, createError }: ILearningsService) {
    super({ repository: learningsRepository, createError, model: LeaLearnings });
  }
}

export default LearningsService;
