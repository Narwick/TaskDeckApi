import { Op, Transaction } from 'sequelize';
import mapper from './ChallengesMapper';
import { BaseRepository, IGetById } from '../BaseRepository';
import { ChaChallenges } from '../../models/ChaChallenges';

interface IChallengesRepository {
  createError: (statusCode: number, message: string) => Error;
  db: any;
}

export class ChallengesRepository extends BaseRepository<ChaChallenges> {
  db: any;
  constructor({ db, createError }: IChallengesRepository) {
    super(ChaChallenges, createError, mapper, []);
    this.db = db;
  }
}

export default ChallengesRepository;
