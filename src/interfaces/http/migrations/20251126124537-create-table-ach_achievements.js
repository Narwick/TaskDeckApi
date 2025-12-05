module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      { tableName: "ach_achievements", schema: "task_deck" },
      {
        ach_id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        ach_wer_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: { tableName: "wer_week_reports", schema: "task_deck" },
            key: "wer_id",
          },
        },
        ach_title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        ach_description: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        ach_status: {
          type: Sequelize.INTEGER(1),
          allowNull: false,
          defaultValue: 1,
        },
        ach_created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        ach_updated_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable({ tableName: "ach_achievements", schema: "task_deck" });
  },
};
