'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Comment', {
     _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    text: DataTypes.STRING(8000),
    active: DataTypes.BOOLEAN()
  });
};