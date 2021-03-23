module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.createTable(`projects`, {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        projectId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: true,
        },
        videoLink: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        initialPrompt: {
          type: Sequelize.STRING(1024),
          allowNull: false,
        },
        mapPrompt: {
          type: Sequelize.STRING(1024),
          allowNull: false,
        },
        finalPrompt: {
          type: Sequelize.STRING(1024),
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

      return Promise.resolve()
    } catch (err) {
      return Promise.reject(err)
    }
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(`projects`)
  },
}
