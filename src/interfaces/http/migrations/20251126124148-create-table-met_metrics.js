module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      { tableName: "met_metrics", schema: "task_deck" },
      {
        met_id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        met_wer_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: { tableName: "wer_week_reports", schema: "task_deck" },
            key: "wer_id",
          },
        },
        met_tasks_completed: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        met_projects_advanced: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        met_hours_worked: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        met_meetings_count: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        met_status: {
          type: Sequelize.INTEGER(1),
          allowNull: false,
          defaultValue: 1,
        },
        met_created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        met_updated_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable({ tableName: "met_metrics", schema: "task_deck" });
  },
};
