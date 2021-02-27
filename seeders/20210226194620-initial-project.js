const Project = require(`../models/project`)
const Respondent = require(`../models/respondent`)

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert(`People`, [{
     *   name: `John Doe`,
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert(`projects`, [
      {
        name: `Development`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete(`People`, null, {});
     */
  },
}
