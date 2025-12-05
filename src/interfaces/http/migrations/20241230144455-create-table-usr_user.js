module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      { tableName: "usr_user", schema: "task_deck" },
      {
        usr_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        usr_name: {
          type: Sequelize.STRING(150),
          allowNull: false,
        },
        usr_email: {
          type: Sequelize.STRING(150),
          allowNull: true,
        },
        usr_password: {
          type: Sequelize.STRING(150),
          allowNull: false,
        },
        // usr_permission: {
        //   type: Sequelize.ENUM("admin", "editor", "leitor"),
        //   allowNull: false,
        // },
        usr_status: {
          type: Sequelize.INTEGER(1),
          allowNull: false,
          defaultValue: 1,
        },
        usr_created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        usr_updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      }
    );
  },
  async down(queryInterface) {
    await queryInterface.dropTable({ tableName: "usr_user", schema: "task_deck" });
  },
};
