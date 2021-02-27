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
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
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
    }
  )
  return Respondent
}
