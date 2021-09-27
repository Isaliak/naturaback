'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  log.init({
    type: DataTypes.STRING,
    call: DataTypes.STRING,
    functionName: DataTypes.STRING,
    message: DataTypes.STRING,
    ip: DataTypes.STRING,
    cod_resp: DataTypes.INTEGER,
    parameters: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN,
    state: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'log',
  });
  return log;
};