import { Model, DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../config";
import { hash } from "bcrypt";

export class UsrUser extends Model {
  public usr_id!: number;
  public usr_name!: string;
  public usr_email!: string;
  public usr_password!: string;
  public usr_status!: number;
  public usr_avatar?: string;
  public usr_created_at!: Date;
  public usr_updated_at!: Date;
}

UsrUser.init(
  {
    usr_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usr_name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    usr_email: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    usr_password: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    usr_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    usr_avatar: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    usr_created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    usr_updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    sequelize,
    modelName: "UsrUser",
    tableName: "usr_user",
    schema: "task_deck",
    timestamps: true,
    createdAt: "usr_created_at",
    updatedAt: "usr_updated_at",
    defaultScope: {
      attributes: { exclude: ["usr_password"] },
    },
    scopes: {
      withPassword: {
        attributes: { include: ["usr_password"] },
      },
    },
    hooks: {
      beforeCreate: async (user) => {
        if (!user.usr_password) return;
        const saltRounds = 10;
        user.usr_password = await hash(user.usr_password, saltRounds);
      },
      beforeUpdate: async (user) => {
        if (!user.usr_password) return;
        const saltRounds = 10;
        user.usr_password = await hash(user.usr_password, saltRounds);
      },
    },
  }
);

// UsrUser.belongsTo(CmpCompany, {
//   foreignKey: 'usr_cmp_id',
//   as: 'cmpCompany',
// });

export default () => {
  return UsrUser;
};

export const USER_ASSOCIATIONS = [];
