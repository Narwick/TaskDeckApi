import { Op, Transaction } from 'sequelize';
import mapper from './AchievementsMapper';
import { BaseRepository, IGetById } from '../BaseRepository';
import { AchAchievements } from '../../models/AchAchievements';

interface IAchievementsRepository {
  createError: (statusCode: number, message: string) => Error;
  db: any;
}

export class AchievementsRepository extends BaseRepository<AchAchievements> {
  db: any;
  constructor({ db, createError }: IAchievementsRepository) {
    super(AchAchievements, createError, mapper, []);
    this.db = db;
  }
}

export default AchievementsRepository;
