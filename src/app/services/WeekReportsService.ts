import { BaseService } from "./BaseService";
import { TypeCreateError } from "../../types";
import { WerWeekReports } from "../../infrastructure/database/models/WerWeekReports";
import { WeekReportsRepository } from "src/infrastructure/database/repository/WeekReports/WeekReportsRepository";
import { Transaction } from "sequelize";

export interface IWeekReportsService {
  weekReportsRepository: WeekReportsRepository;
  createError: TypeCreateError;
}
export class WeekReportsService extends BaseService<WerWeekReports, WeekReportsRepository> {
  constructor({ weekReportsRepository, createError }: IWeekReportsService) {
    super({ repository: weekReportsRepository, createError, model: WerWeekReports });
  }
  async getAll(params: any, transaction?: Transaction) {
    return this.repository.findAndCountAll(params, transaction);
  }
}

export default WeekReportsService;
