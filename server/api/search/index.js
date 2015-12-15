'use strict';

var express = require('express');
var controller = require('./search.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();


// TODO WRITE THESE OUT FOR 
// base route is '/api/search/',
router.get('/tags', controller.tags);
router.get('/geo', controller.geo);
router.get('/searchCriteria', controller.searchCriteria);
// router.get('/', controller.index);
// router.get('/:id', controller.show);
// router.get('/:id/user', controller.user);
// router.get('/:id/comments', controller.comments);


module.exports = router;