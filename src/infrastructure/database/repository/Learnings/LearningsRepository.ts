import { Op, Transaction } from 'sequelize';
import mapper from './LearningsMapper';
import { BaseRepository, IGetById } from '../BaseRepository';
import { LeaLearnings } from '../../models/LeaLearnings';

interface ILearningsRepository {
  createError: (statusCode: number, message: string) => Error;
  db: any;
}

export class LearningsRepository extends BaseRepository<LeaLearnings> {
  db: any;
  constructor({ db, createError }: ILearningsRepository) {
    super(LeaLearnings, createError, mapper, []);
    this.db = db;
  }
}

export default LearningsRepository;
