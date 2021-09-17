'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  transaction_type.init({
    name: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN,
    state: DataTypes.BOOLEAN
  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'transaction_type',
  });
  return transaction_type;
};