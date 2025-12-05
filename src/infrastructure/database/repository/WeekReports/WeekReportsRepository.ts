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
  async findAndCountAll(params: any, transaction?: Transaction) {
    const { page = 1, amount = 30, order, direct = "desc", filters, include, baseAssociation = true } = params;
    console.log("Params received in findAndCountAll:", params);
    const where: any = {wer_user_id: params?.wer_user_id};
    if (filters) {
      Object.keys(filters).forEach((key: any) => {
        if (filters[key]) {
          if (key.includes("start_date")) {
            where[key] = { [Op.gte]: filters[key] }; 
          } else if (key.includes("end_date")) {
            where[key] = { [Op.lte]: filters[key] }; 
          } else if (key.includes("_id")) {
            where[key] = filters[key];
          } else {
            where[key] = { [Op.like]: `%${filters[key]}%` };
          }
        }
      });
    }

    const parametrosBusca: any = this.includes(include, baseAssociation);

    const newOrder = order ? { order: [[order, direct]] } : {};
    const limit = Number(amount);
    const pagination = (page - 1) * (Number(amount) ? Number(amount) : 15);

    const { count, rows } = await this.model.findAndCountAll({
      ...newOrder,
      where,
      ...parametrosBusca,
      limit,
      // subQuery: false,
      offset: pagination,
      transaction,
    });
    const countList = rows.length;
    return {
      count: countList,
      totalPages: countList === 0 ? 0 : Math.ceil(countList / limit),
      list: rows,
    };
  }
}

export default WeekReportsRepository;
