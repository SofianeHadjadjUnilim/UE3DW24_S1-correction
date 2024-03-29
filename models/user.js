'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Users.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    firstname: {
      type: DataTypes.STRING,     // This will require the firstname be present
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,     // This will require the firstname be present
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return Users;
};