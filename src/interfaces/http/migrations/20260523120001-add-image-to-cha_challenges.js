module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      { tableName: 'cha_challenges', schema: 'task_deck' },
      'cha_image',
      {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(
      { tableName: 'cha_challenges', schema: 'task_deck' },
      'cha_image'
    );
  },
};
