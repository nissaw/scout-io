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
db.Asset = db.sequelize.import('../api/asset/asset.model');
db.Comment = db.sequelize.import('../api/comment/comment.model');
db.Folder = db.sequelize.import('../api/folder/folder.model');
db.Link = db.sequelize.import('../api/link/link.model');
db.Project = db.sequelize.import('../api/project/project.model');

//Foreign Keys
// db.Comment.belongsTo(db.Asset);
db.Comment.belongsTo(db.Link);
db.Comment.belongsTo(db.User);
db.Folder.belongsTo(db.Project);
db.Folder.belongsTo(db.Folder);
db.Link.belongsTo(db.Folder);



export default db;
