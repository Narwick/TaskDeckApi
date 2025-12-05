module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      { tableName: "wer_week_reports", schema: "task_deck" },
      {
        wer_id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        wer_user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: { tableName: "usr_user", schema: "task_deck" },
            key: "usr_id",
          },
        },
        wer_start_date: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        wer_end_date: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        wer_status: {
          type: Sequelize.INTEGER(1),
          allowNull: false,
          defaultValue: 1,
        },
        wer_created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        wer_updated_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable({ tableName: "wer_week_reports", schema: "task_deck" });
  },
};
