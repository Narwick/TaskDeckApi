import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { MetricsSchema } from "../schemas/MetricsSchema";
import { MetricsService } from "src/app/services/MetricsService";
import { Op } from "sequelize";

interface IMetricsController {
  metricsSchema: MetricsSchema;
  metricsService: MetricsService;
}

export class MetricsController extends BaseController<MetricsService, MetricsSchema> {
  metricsSchema: MetricsSchema;
  metricsService: MetricsService;
  constructor({ metricsService, metricsSchema }: IMetricsController) {
    super(metricsService, metricsSchema);
    this.metricsSchema = metricsSchema;
    this.metricsService = metricsService;
  }
}

export default MetricsController;
