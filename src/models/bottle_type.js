'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bottle_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  bottle_type.init({
    name: DataTypes.STRING,
    value: DataTypes.NUMERIC,
    deleted: DataTypes.BOOLEAN,
    state: DataTypes.BOOLEAN
  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'bottle_type',
  });
  return bottle_type;
};