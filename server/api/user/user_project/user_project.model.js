'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserProject', {
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user'
    },
    active: DataTypes.BOOLEAN
  });
};
