module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      { tableName: "lea_learnings", schema: "task_deck" },
      {
        lea_id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        lea_wer_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: { tableName: "wer_week_reports", schema: "task_deck" },
            key: "wer_id",
          },
        },
        lea_title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        lea_description: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        lea_status: {
          type: Sequelize.INTEGER(1),
          allowNull: false,
          defaultValue: 1,
        },
        lea_created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        lea_updated_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable({ tableName: "lea_learnings", schema: "task_deck" });
  },
};
