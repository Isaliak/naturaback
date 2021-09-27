'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contact_center extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  contact_center.init({
    email: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    who_we_are: DataTypes.STRING,
    what_do_we_do: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN,
    state: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'contact_center',
  });
  return contact_center;
};