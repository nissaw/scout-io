'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Project', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    info: DataTypes.STRING(8000),
    active: DataTypes.BOOLEAN
  });
};
