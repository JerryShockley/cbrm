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
          autoIncrement: true,
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
      const seqQuery = `ALTER SEQUENCE "projects_projectId_seq" restart with 100`
      await queryInterface.sequelize.query(seqQuery, `RAW`)

      return Promise.resolve()
    } catch (err) {
      return Promise.reject(err)
    }
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(`projects`)
  },
}
