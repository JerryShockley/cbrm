// const Project = require(`./project`)
// const Mapping = require(`./mapping`)
const { Model } = require(`sequelize`)

module.exports = (sequelize, DataTypes) => {
  class Respondent extends Model {
    static getMappingsCount(pmappings) {
      return pmappings.length
    }

    static sumMappingDurations(pmappings) {
      const sumReducer = (accumulator, currentMapping) => {
        return accumulator + currentMapping.duration
      }
      return pmappings.reduce(sumReducer, 0)
    }

    getDurationString() {
      const time = new Date(null)
      time.setSeconds(this.duration)
      return time.toISOString().substr(11, 8)
    }

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Respondent.hasMany(models.Mapping, {
        as: `mappings`,
        foreignKey: `respondentId`,
      })
    }
  }
  Respondent.init(
    {
      respondentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      pointCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      duration: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: `Respondent`,
      tableName: `respondents`,
    }
  )
  return Respondent
}
