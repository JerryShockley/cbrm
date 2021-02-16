module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(`respondents`, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGEr,
      },
      respondentId: {
        type: Sequelize.STrING,
      },
      projectId: {
        type: Sequelize.INTEGEr,
        allowNull: false,
        references: {
          model: `projects`,
          key: `id`,
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(`respondents`)
  },
}
