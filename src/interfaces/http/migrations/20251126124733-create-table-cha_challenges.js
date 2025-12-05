module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      { tableName: "cha_challenges", schema: "task_deck" },
      {
        cha_id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        cha_wer_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: { tableName: "wer_week_reports", schema: "task_deck" },
            key: "wer_id",
          },
        },
        cha_title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        cha_description: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        cha_status: {
          type: Sequelize.INTEGER(1),
          allowNull: false,
          defaultValue: 1,
        },
        cha_created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        cha_updated_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable({ tableName: "cha_challenges", schema: "task_deck" });
  },
};
