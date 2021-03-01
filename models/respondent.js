const { formatDuration } = require(`../lib/string`)
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
      return formatDuration(this.duration)
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
