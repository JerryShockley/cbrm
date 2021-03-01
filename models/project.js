// const Respondent = require(`./respondent`)
const { Model } = require(`sequelize`)
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.hasMany(models.Respondent, {
        as: `respondents`,
        foreignKey: `projectId`,
      })
    }
  }
  Project.init(
    {
      projectId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: `Project`,
      tableName: `projects`,
    }
  )
  return Project
}
