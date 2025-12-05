import { Model, DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../config";

export class LeaLearnings extends Model {
  public lea_id!: number;
  public lea_wer_id!: number;
  public lea_title!: string;
  public lea_description!: string;
  public lea_status!: number;
  public lea_created_at!: Date;
  public lea_updated_at!: Date;
}

LeaLearnings.init(
  {
    lea_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    lea_wer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: { tableName: "wer_week_reports", schema: "task_deck" },
        key: "wer_id",
      },
    },
    lea_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lea_description: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lea_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    lea_created_at: {
      type: DataTypes.DATE,
    },
    lea_updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "LeaLearnings",
    tableName: "lea_learnings",
    schema: "task_deck",
    timestamps: false,
  }
);

export default () => {
  return LeaLearnings;
};
