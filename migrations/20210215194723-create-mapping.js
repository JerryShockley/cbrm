module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(`mappings`, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      brand: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      notes: Sequelize.STRING(1024),
      order: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cartesianX: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cartesianY: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      respondent_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: `respondents`,
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
    await queryInterface.dropTable(`mappings`)
  },
}
