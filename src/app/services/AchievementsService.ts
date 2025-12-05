import { BaseService } from "./BaseService";
import { TypeCreateError } from "../../types";
import { AchAchievements } from "../../infrastructure/database/models/AchAchievements";
import { AchievementsRepository } from "src/infrastructure/database/repository/Achievements/AchievementsRepository";
import { Transaction } from "sequelize";

export interface IAchievementsService {
  achievementsRepository: AchievementsRepository;
  createError: TypeCreateError;
}
export class AchievementsService extends BaseService<AchAchievements, AchievementsRepository> {
  constructor({ achievementsRepository, createError }: IAchievementsService) {
    super({ repository: achievementsRepository, createError, model: AchAchievements });
  }
}

export default AchievementsService;
