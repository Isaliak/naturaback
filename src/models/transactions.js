'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.customer, {
        foreignKey: 'id'
      });
    }
  };
  transactions.init({
    customer_id: DataTypes.INTEGER,
    company_id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    detail: DataTypes.STRING,
    type: DataTypes.INTEGER,
    pin: DataTypes.INTEGER,
    origin: DataTypes.STRING,
    ip: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    picture: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN,
    state: DataTypes.BOOLEAN
  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'transactions',
  });
  return transactions;
};