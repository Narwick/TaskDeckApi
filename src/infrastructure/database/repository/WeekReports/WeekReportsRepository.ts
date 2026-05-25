import { Op, Transaction } from "sequelize";
import mapper from "./WeekReportsMapper";
import { BaseRepository, IGetById } from "../BaseRepository";
import { WerWeekReports, WEEKREPORTS_ASSOCIATIONS } from "../../models/WerWeekReports";
import { IFindAndCountAll } from "src/types";

interface IWeekReportsRepository {
  createError: (statusCode: number, message: string) => Error;
  db: any;
}

export class WeekReportsRepository extends BaseRepository<WerWeekReports> {
  db: any;
  constructor({ db, createError }: IWeekReportsRepository) {
    super(WerWeekReports, createError, mapper, WEEKREPORTS_ASSOCIATIONS);
    this.db = db;
  }
  async findByShareToken(token: string) {
    const parametrosBusca: any = this.includes(undefined, true);
    return this.model.findOne({ where: { wer_share_token: token }, ...parametrosBusca });
  }

  async findAndCountAll(params: any, transaction?: Transaction) {
    const { page = 1, amount, limit: limitParam, order, direct = "desc", include, baseAssociation = true, start_date, end_date } = params;
    const where: any = { wer_user_id: params?.wer_user_id };
    if (start_date) where["wer_start_date"] = { [Op.gte]: start_date };
    if (end_date) where["wer_start_date"] = { ...(where["wer_start_date"] ?? {}), [Op.lte]: end_date };

    const parametrosBusca: any = this.includes(include, baseAssociation);

    const newOrder = order ? { order: [[order, direct]] } : {};
    const limit = Number(limitParam || amount || 30);
    const pagination = (page - 1) * limit;

    const { count, rows } = await this.model.findAndCountAll({
      ...newOrder,
      where,
      ...parametrosBusca,
      limit,
      offset: pagination,
      transaction,
    });
    return {
      count,
      totalPages: count === 0 ? 0 : Math.ceil(count / limit),
      list: rows,
    };
  }
}

export default WeekReportsRepository;
