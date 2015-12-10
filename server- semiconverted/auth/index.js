'use strict';

//import express from 'express';
//import passport from 'passport';
//import config from '../config/environment';
//import {User} from '../sqldb';

var express = require('express');
var passport = require('passport');
var config = require('../config/environment');
var _sqldb = require('../sqldb');
var User = _sqldb.User;

// Passport Configuration
require('./local/passport').setup(User, config);
require('./facebook/passport').setup(User, config);
require('./google/passport').setup(User, config);

var router = express.Router();

router.use('/local', require('./local'));
router.use('/facebook', require('./facebook'));
router.use('/google', require('./google'));

module.exports = router;
