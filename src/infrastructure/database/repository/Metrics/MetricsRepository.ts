import { Op, Transaction } from 'sequelize';
import mapper from './MetricsMapper';
import { BaseRepository, IGetById } from '../BaseRepository';
import { MetMetrics } from '../../models/MetMetrics';

interface IMetricsRepository {
  createError: (statusCode: number, message: string) => Error;
  db: any;
}

export class MetricsRepository extends BaseRepository<MetMetrics> {
  db: any;
  constructor({ db, createError }: IMetricsRepository) {
    super(MetMetrics, createError, mapper, []);
    this.db = db;
  }
}

export default MetricsRepository;
