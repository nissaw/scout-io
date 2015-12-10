'use strict';

// Development specific configuration
// ==================================

var localConfig;
try {
  localConfig = require('../local.env');
} catch(e) {
  localConfig = {};
}

module.exports = {

  // Sequelize connection options
  sequelize: {
    uri: 'scoutio.ckptibf82gdw.us-west-2.rds.amazonaws.com',
    dialect: "mysql",
    username: localConfig.MYSQL_USERNAME,
    password: localConfig.MYSQL_PASSWORD,
    database: localConfig.MYSQL_DATABASE
  },

  // Seed database on startup
  seedDB: true

};
