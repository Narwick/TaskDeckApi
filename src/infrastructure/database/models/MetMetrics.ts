import { Model, DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../config";

export class MetMetrics extends Model {
  public met_id!: number;
  public met_wer_id!: number;
  public met_tasks_completed!: number;
  public met_projects_advanced!: number;
  public met_hours_worked!: number;
  public met_meetings_count!: number;
  public met_status!: number;
  public met_created_at!: Date;
  public met_updated_at!: Date;
}

MetMetrics.init(
  {
    met_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    met_wer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: { tableName: "wer_week_reports", schema: "task_deck" },
        key: "wer_id",
      },
    },
    met_tasks_completed: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    met_projects_advanced: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    met_hours_worked: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    met_meetings_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    met_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    met_created_at: {
      type: DataTypes.DATE,
    },
    met_updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "MetMetrics",
    tableName: "met_metrics",
    schema: "task_deck",
    timestamps: false,
  }
);

export default () => {
  return MetMetrics;
};
