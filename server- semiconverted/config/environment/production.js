'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:     process.env.OPENSHIFT_NODEJS_IP ||
          process.env.IP ||
          undefined,

  // Server port
  port:   process.env.OPENSHIFT_NODEJS_PORT ||
          process.env.PORT ||
          8080,

  // Sequelize connection options
  sequelize: {
    uri: 'scoutio.ckptibf82gdw.us-west-2.rds.amazonaws.com',
    dialect: "mysql",
    username: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  },

  // Seed database on startup
  seedDB: false
};
