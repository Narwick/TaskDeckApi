import { Model, DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../config";

export class ChaChallenges extends Model {
  public cha_id!: number;
  public cha_wer_id!: number;
  public cha_title!: string;
  public cha_description!: string;
  public cha_status!: number;
  public cha_created_at!: Date;
  public cha_updated_at!: Date;
}

ChaChallenges.init(
  {
    cha_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cha_wer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: { tableName: "wer_week_reports", schema: "task_deck" },
        key: "wer_id",
      },
    },
    cha_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cha_description: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cha_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    cha_created_at: {
      type: DataTypes.DATE,
    },
    cha_updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "ChaChallenges",
    tableName: "cha_challenges",
    schema: "task_deck",
    timestamps: false,
  }
);

export default () => {
  return ChaChallenges;
};
