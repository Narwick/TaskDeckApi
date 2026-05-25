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

  async getById(req: any, res: Response) {
    const result = await this.weekReportsService.getById({ id: req.params.id, valid: false });
    if (!result || (result as any).wer_user_id !== Number(req.usr_id)) {
      return res.status(404).send({ message: 'Registro não encontrado.' });
    }
    res.status(200).send(result);
  }

  async updateById(req: any, res: Response) {
    const existing = await this.weekReportsService.getById({ id: req.params.id, valid: false });
    if (!existing || (existing as any).wer_user_id !== Number(req.usr_id)) {
      return res.status(404).send({ message: 'Registro não encontrado.' });
    }
    if (this.schema) this.schema.validateUpdate({ data: req.body, id: Number(req.params.id) });
    const result = await this.weekReportsService.updateById({ id: req.params.id, data: req.body, valid: false });
    res.status(200).send(result);
  }

  async deleteById(req: any, res: Response) {
    const existing = await this.weekReportsService.getById({ id: req.params.id, valid: false });
    if (!existing || (existing as any).wer_user_id !== Number(req.usr_id)) {
      return res.status(404).send({ message: 'Registro não encontrado.' });
    }
    const result = await this.weekReportsService.deleteById({ id: req.params.id, valid: false });
    res.status(200).send(result);
  }

  async generateShareToken(req: any, res: Response) {
    const existing = await this.weekReportsService.getById({ id: req.params.id, valid: false });
    if (!existing || (existing as any).wer_user_id !== Number(req.usr_id)) {
      return res.status(404).send({ message: 'Registro não encontrado.' });
    }
    const token = await this.weekReportsService.generateShareToken(Number(req.params.id));
    res.status(200).send({ token });
  }

  async getByShareToken(req: any, res: Response) {
    const report = await this.weekReportsService.getByShareToken(req.params.token);
    if (!report) return res.status(404).send({ message: 'Relatório não encontrado.' });
    res.status(200).send(report);
  }
}

export default WeekReportsController;
