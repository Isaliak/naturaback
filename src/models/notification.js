'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  notification.init({
    user_id: DataTypes.INTEGER,
    device_token: DataTypes.STRING,
    device_type: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN,
    state: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'notification',
  });
  return notification;
};