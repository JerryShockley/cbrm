const { LoremIpsum } = require(`lorem-ipsum`)
const { nextProjectId } = require(`../lib/idFactory`)
const { randomNumber } = require(`../lib/utils`)

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: 10,
        min: 4,
      },
      wordsPerSentence: {
        max: 16,
        min: 5,
      },
    })

    function createProject() {
      obj = {}
      obj.projectId = nextProjectId()
      obj.name = lorem.generateWords(randomNumber(1, 3))
      obj.videoLink = `<iframe width="640" height="480" src="https://www.youtube.com/embed/BbR5YFZsINI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
      obj.initialPrompt = lorem.generateParagraphs(1)
      obj.mapPrompt = lorem.generateParagraphs(1)
      obj.finalPrompt = lorem.generateParagraphs(1)
      obj.createdAt = new Date()
      obj.updatedAt = new Date()
      return obj
    }

    projects = []
    for (let step = 0; step < 3; step++) {
      const newProject = createProject()
      projects.push(obj)
    }
    await queryInterface.bulkInsert(`projects`, projects, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(`projects`, null, {})
  },
}
