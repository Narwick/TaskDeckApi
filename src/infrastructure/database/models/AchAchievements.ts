import { Model, DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../config";

export class AchAchievements extends Model {
  public ach_id!: number;
  public ach_wer_id!: number;
  public ach_title!: string;
  public ach_description!: string;
  public ach_status!: number;
  public ach_image?: string;
  public ach_created_at!: Date;
  public ach_updated_at!: Date;
}

AchAchievements.init(
  {
    ach_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ach_wer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: { tableName: "wer_week_reports", schema: "task_deck" },
        key: "wer_id",
      },
    },
    ach_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ach_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ach_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    ach_image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    ach_created_at: {
      type: DataTypes.DATE,
    },
    ach_updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "AchAchievements",
    tableName: "ach_achievements",
    schema: "task_deck",
    timestamps: false,
  }
);

export default () => {
  return AchAchievements;
};
