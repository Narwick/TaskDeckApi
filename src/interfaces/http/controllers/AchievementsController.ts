import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { AchievementsSchema } from "../schemas/AchievementsSchema";
import { AchievementsService } from "src/app/services/AchievementsService";
import { Op } from "sequelize";

interface IAchievementsController {
  achievementsSchema: AchievementsSchema;
  achievementsService: AchievementsService;
}

export class AchievementsController extends BaseController<AchievementsService, AchievementsSchema> {
  achievementsSchema: AchievementsSchema;
  achievementsService: AchievementsService;
  constructor({ achievementsService, achievementsSchema }: IAchievementsController) {
    super(achievementsService, achievementsSchema);
    this.achievementsSchema = achievementsSchema;
    this.achievementsService = achievementsService;
  }
}

export default AchievementsController;
