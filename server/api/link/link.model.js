'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Link', {
     __id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.CHAR(255),
    url: {
      type: DataTypes.CHAR(255),
      validate: {
        notEmpty: true
      }
    },//Unique?
    apiID: DataTypes.INTEGER(11),
    apiName: DataTypes.CHAR(45), //Char?
    publicComments: DataTypes.Char(8000),
    folderID: DataTypes.INTEGER(11),
    active: DataTypes.BOOLEAN()
  });
};