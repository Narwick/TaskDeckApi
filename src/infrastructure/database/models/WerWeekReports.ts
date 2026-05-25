import { Model, DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../config";

export class WerWeekReports extends Model {
  public wer_id!: number;
  public wer_user_id!: number;
  public wer_start_date!: Date;
  public wer_end_date!: Date;
  public wer_status!: number;
  public wer_share_token?: string;
  public wer_created_at!: Date;
  public wer_updated_at!: Date;
}

WerWeekReports.init(
  {
    wer_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    wer_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: { tableName: "usr_user", schema: "task_deck" },
        key: "usr_id",
      },
    },
    wer_start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    wer_end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    wer_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    wer_share_token: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    wer_created_at: {
      type: DataTypes.DATE,
    },
    wer_updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "WerWeekReports",
    tableName: "wer_week_reports",
    schema: "task_deck",
    timestamps: false,
  }
);

export default () => {
  return WerWeekReports;
};

export const WEEKREPORTS_ASSOCIATIONS = ['metMetrics','leaLearnings','chaChallenges','achAchievements', 'usrUser'];
