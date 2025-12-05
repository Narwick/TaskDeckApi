import { BaseService } from "./BaseService";
import { TypeCreateError } from "../../types";
import { MetMetrics } from "../../infrastructure/database/models/MetMetrics";
import { MetricsRepository } from "src/infrastructure/database/repository/Metrics/MetricsRepository";
import { Transaction } from "sequelize";

export interface IMetricsService {
  metricsRepository: MetricsRepository;
  createError: TypeCreateError;
}
export class MetricsService extends BaseService<MetMetrics, MetricsRepository> {
  constructor({ metricsRepository, createError }: IMetricsService) {
    super({ repository: metricsRepository, createError, model: MetMetrics });
  }
}

export default MetricsService;
