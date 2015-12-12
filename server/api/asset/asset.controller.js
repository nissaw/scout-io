/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/assets              ->  index
 * POST    /api/assets              ->  create
 * GET     /api/assets/:id          ->  show
 * PUT     /api/assets/:id          ->  update
 * DELETE  /api/assets/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var Asset = sqldb.Asset;

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    return entity.updateAttributes(updates)
      .then(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.destroy()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Assets
exports.index = function(req, res) {
  Asset.findAll()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Asset from the DB
exports.show = function(req, res) {
  Asset.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Asset in the DB
exports.create = function(req, res) {
  Asset.create(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Asset in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Asset.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Asset from the DB
exports.destroy = function(req, res) {
  Asset.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};

/**
 * Get asset commnets
 */

exports.comments = function(req, res) {
  Asset.find({
      where: {
        _id: req.params.id
      }
    })
    .then(function(asset) {
      if (!asset) {
        return res.status(401).end();
      }
      asset.getComments().then(function (comments) {
        res.json(comments);
      });
    })
    .catch(function(err) {
      return next(err);
    });
};

/**
 * Get asset user
 */

exports.user = function(req, res) {
  Asset.find({
      where: {
        _id: req.params.id
      }
    })
    .then(function(asset) {
      if (!asset) {
        return res.status(401).end();
      }
      asset.getUser().then(function (user) {
        res.json(user);
      });
    })
    .catch(function(err) {
      return next(err);
    });
};
