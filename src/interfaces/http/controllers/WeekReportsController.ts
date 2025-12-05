import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { WeekReportsSchema } from "../schemas/WeekReportsSchema";
import { WeekReportsService } from "src/app/services/WeekReportsService";
import { CreateWeekReportsOperation } from "../../../app/operations/weekReports/CreateWeekReportsOperation";
import { Op } from "sequelize";

interface IWeekReportsController {
  weekReportsSchema: WeekReportsSchema;
  weekReportsService: WeekReportsService;
  createWeekReportsOperation: CreateWeekReportsOperation;
}

export class WeekReportsController extends BaseController<WeekReportsService, WeekReportsSchema> {
  weekReportsSchema: WeekReportsSchema;
  weekReportsService: WeekReportsService;
  createWeekReportsOperation: CreateWeekReportsOperation;

  constructor({ weekReportsService, weekReportsSchema, createWeekReportsOperation }: IWeekReportsController) {
    super(weekReportsService, weekReportsSchema);
    this.weekReportsSchema = weekReportsSchema;
    this.weekReportsService = weekReportsService;
    this.createWeekReportsOperation = createWeekReportsOperation;
  }
  async create(req: Request, res: Response) {
    if (this.schema) {
      this.schema.validateCreate(req.body);
    }
    req.body.wer_user_id = req?.usr_id;
    const result = await this.createWeekReportsOperation.execute(req.body);
    res.status(201).send(result);
  }
  async getAll(req: Request, res: Response) {
    const params: any = req.query;
    params.wer_user_id = req?.usr_id;
    const result = await this.service.getAll(params as any);
    res.status(200).send(result);
  }
}

export default WeekReportsController;
