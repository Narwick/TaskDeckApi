import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { ChallengesSchema } from "../schemas/ChallengesSchema";
import { ChallengesService } from "src/app/services/ChallengesService";
import { Op } from "sequelize";

interface IChallengesController {
  challengesSchema: ChallengesSchema;
  challengesService: ChallengesService;
}

export class ChallengesController extends BaseController<ChallengesService, ChallengesSchema> {
  challengesSchema: ChallengesSchema;
  challengesService: ChallengesService;
  constructor({ challengesService, challengesSchema }: IChallengesController) {
    super(challengesService, challengesSchema);
    this.challengesSchema = challengesSchema;
    this.challengesService = challengesService;
  }
}

export default ChallengesController;
