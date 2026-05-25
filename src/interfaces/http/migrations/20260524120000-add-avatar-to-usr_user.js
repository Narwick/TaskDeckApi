module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      { tableName: 'usr_user', schema: 'task_deck' },
      'usr_avatar',
      {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(
      { tableName: 'usr_user', schema: 'task_deck' },
      'usr_avatar'
    );
  },
};
