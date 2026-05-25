module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      { tableName: 'wer_week_reports', schema: 'task_deck' },
      'wer_share_token',
      { type: Sequelize.STRING(64), allowNull: true, unique: true }
    );
  },
  async down(queryInterface) {
    await queryInterface.removeColumn(
      { tableName: 'wer_week_reports', schema: 'task_deck' },
      'wer_share_token'
    );
  },
};
