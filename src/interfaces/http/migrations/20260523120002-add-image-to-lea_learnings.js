module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      { tableName: 'lea_learnings', schema: 'task_deck' },
      'lea_image',
      {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(
      { tableName: 'lea_learnings', schema: 'task_deck' },
      'lea_image'
    );
  },
};
