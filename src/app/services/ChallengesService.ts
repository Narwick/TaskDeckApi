import { BaseService } from "./BaseService";
import { TypeCreateError } from "../../types";
import { ChaChallenges } from "../../infrastructure/database/models/ChaChallenges";
import { ChallengesRepository } from "src/infrastructure/database/repository/Challenges/ChallengesRepository";
import { Transaction } from "sequelize";

export interface IChallengesService {
  challengesRepository: ChallengesRepository;
  createError: TypeCreateError;
}
export class ChallengesService extends BaseService<ChaChallenges, ChallengesRepository> {
  constructor({ challengesRepository, createError }: IChallengesService) {
    super({ repository: challengesRepository, createError, model: ChaChallenges });
  }
}

export default ChallengesService;
