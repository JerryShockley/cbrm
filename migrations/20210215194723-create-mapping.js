module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(`Mappings`, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      notes: DataTypes.STRING(1024),
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cartesianX: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cartesianY: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      duration: {
        type: DataTypes.Integer,
        allowNull: false,
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
    await queryInterface.dropTable(`Mappings`)
  },
}
