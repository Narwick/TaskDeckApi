import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { LearningsSchema } from "../schemas/LearningsSchema";
import { LearningsService } from "src/app/services/LearningsService";
import { Op } from "sequelize";

interface ILearningsController {
  learningsSchema: LearningsSchema;
  learningsService: LearningsService;
}

export class LearningsController extends BaseController<LearningsService, LearningsSchema> {
  learningsSchema: LearningsSchema;
  learningsService: LearningsService;
  constructor({ learningsService, learningsSchema }: ILearningsController) {
    super(learningsService, learningsSchema);
    this.learningsSchema = learningsSchema;
    this.learningsService = learningsService;
  }
}

export default LearningsController;
