'use strict';

var express = require('express');
var controller = require('./search.controller');

var router = express.Router();

// base route is '/api/search/',
// router.get('/', controller.tags);
router.get('/tag/:query', controller.tags);
router.get('/geo/:geo', controller.geo);
router.post('/advancedSearch', controller.searchCriteria);

// router.get('/', controller.index);
// router.get('/:id', controller.show);
// router.get('/:id/user', controller.user);
// router.get('/:id/comments', controller.comments);


module.exports = router;
