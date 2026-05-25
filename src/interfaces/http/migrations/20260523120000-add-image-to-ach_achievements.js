module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      { tableName: 'ach_achievements', schema: 'task_deck' },
      'ach_image',
      {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(
      { tableName: 'ach_achievements', schema: 'task_deck' },
      'ach_image'
    );
  },
};
