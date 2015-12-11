/**
 * Sequelize initialization module
 */

'use strict';

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';

var db = {
  Sequelize: Sequelize,
  sequelize: new Sequelize(
    config.sequelize.database,
    config.sequelize.username,
    config.sequelize.password, {
      host: config.sequelize.uri,
      dialect: config.sequelize.dialect }
  )
};

// Insert models below
db.Thing = db.sequelize.import('../api/thing/thing.model');
db.User = db.sequelize.import('../api/user/user.model');
db.Folder = db.sequelize.import('../api/folder/folder.model');
db.Project = db.sequelize.import('../api/project/project.model');

db.Folder.belongsTo(db.Project);
db.Folder.belongsTo(db.Folder);

export default db;
