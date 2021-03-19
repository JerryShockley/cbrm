const { QueryTypes } = require(`sequelize`)
const { LoremIpsum } = require(`lorem-ipsum`)
const { getRandomNumber, getRandomIntegerWithSign } = require(`../lib/utils`)
const env = process.env.NODE_ENV || `development`
const config = require(`${__dirname}/../config/config`)[env]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    sequelize = new Sequelize(config)
    const Respondent = require(`../models/respondent`)(
      sequelize,
      Sequelize.DataTypes
    )
    respondents = await Respondent.findAll()

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

    const mappings = []

    function createMapping(respondent_id, idx) {
      obj = {}
      obj.respondent_id = respondent_id
      obj.brand = lorem.generateWords(getRandomNumber(1, 3))
      if (getRandomNumber(1, 10) < 3) {
        obj.notes = lorem.generateSentences(getRandomNumber(1, 2))
      }
      obj.order = idx + 1
      obj.cartesianX = getRandomIntegerWithSign(0, 100)
      obj.cartesianY = getRandomIntegerWithSign(0, 100)
      obj.duration = getRandomNumber(1, 60)
      obj.createdAt = new Date()
      obj.updatedAt = new Date()
      return obj
    }

    async function asyncForEach(array, callback) {
      for (let idx = 0; idx < array.length; idx++) {
        await callback(array[idx], idx, array)
      }
    }

    const generateRepondentMappings = async (respondent, idxs) => {
      const respondentMappings = []
      for (const idx of idxs) {
        const newMapping = createMapping(respondent.id, idx)
        respondentMappings.push(newMapping)
        mappings.push(newMapping)
      }
      return await Promise.all(respondentMappings)
    }

    const updateRespondentRecord = async (respondent, respondentMappings) => {
      console.log(`Updating respondent record ${respondent.id}`)
      respondent.set(`pointCount`, respondentMappings.length)
      const duration = Respondent.sumMappingDurations(respondentMappings)
      respondent.set(`durationSum`, duration)
      console.log(
        `pointCount = ${respondent.pointCount}     duration = ${respondent.durationSum}`
      )
      console.log(JSON.stringify(respondent, null, 2))
      respondent.save()
    }

    const processRespondents = async () => {
      respondents.forEach(async (respondent) => {
        const count = getRandomNumber(3, 10)
        const idxs = [...Array(count).keys()]
        const respondentMappings = await generateRepondentMappings(
          respondent,
          idxs
        )
        await updateRespondentRecord(respondent, respondentMappings)
      })
    }

    const generateData = async () => {
      await processRespondents()
      console.log(`Generated ${mappings.length} mappings.`)
      await queryInterface.bulkInsert(`mappings`, mappings, {})
    }

    generateData()
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(`mappings`, null, {})
  },
}
