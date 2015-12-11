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
db.User = db.sequelize.import('../api/user/user.model');
db.Asset = db.sequelize.import('../api/asset/asset.model');
db.Comment = db.sequelize.import('../api/comment/comment.model');
db.Folder = db.sequelize.import('../api/folder/folder.model');
db.Link = db.sequelize.import('../api/link/link.model');
db.Project = db.sequelize.import('../api/project/project.model');
db.UserProject = db.sequelize.import('../api/user/user_project/user_project.model');

//Foreign Keys
// db.Comment.belongsTo(db.Asset);
db.Comment.belongsTo(db.Link);
db.Comment.belongsTo(db.User);
db.Folder.belongsTo(db.Project);
db.Link.belongsTo(db.Folder);
db.Project.hasMany(db.Folder);
db.Folder.belongsTo(db.Folder, {
  constraints: false
});
db.Folder.hasMany(db.Folder, {
  constraints: false
});

db.User.belongsToMany(db.Project, {
  through: db.UserProject,
  constraints: false
});
db.Project.belongsToMany(db.User, {
  through: db.UserProject,
  constraints: false
});

export default db;
