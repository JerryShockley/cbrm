module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.createTable(`respondents`, {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        respondentId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
        },
        pointCount: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
        duration: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
        projectId: {
          type: Sequelize.INTEGER,
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
      const seqQuery = `ALTER SEQUENCE "respondents_respondentId_seq" restart with 1000`
      await queryInterface.sequelize.query(seqQuery, `RAW`)

      return Promise.resolve()
    } catch (err) {
      return Promise.reject(err)
    }
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(`respondents`)
  },
}
