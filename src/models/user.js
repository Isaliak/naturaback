'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.customer, {
        foreignKey: 'ci_number'
      });
      this.belongsTo(models.roles, {
        foreignKey: 'id'
      });
    }
  };
  user.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    customer_id: DataTypes.INTEGER,
    rol_id: DataTypes.INTEGER,
    deleted: DataTypes.BOOLEAN,
    state: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};