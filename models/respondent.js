const { Model } = require(`sequelize`)
module.exports = (sequelize, DataTypes) => {
  class Respondent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Respondent.belongsTo(models.Project)
      Respondent.hasMany(models.Mapping)
    }
  }
  Respondent.init(
    {
      respondentId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: `Respondent`,
    }
  )
  return Respondent
}
