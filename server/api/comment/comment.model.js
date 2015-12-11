'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Comment', {
     _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    text: DataTypes.Char(8000),
    userId: DataTypes.INTEGER(11),
    linkId: DataTypes.INTEGER(11),
    assetId: DataTypes.INTEGER(11),
    active: DataTypes.BOOLEAN()
  });
};