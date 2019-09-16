const express = require('express');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const winston = require('winston');
const snakeify = require('snake-case');

const Notifications = require('../notifications');
const Config = require('../../config.json');
const UserService = require('../user');
const Messages = require('../messages.json');

let router = express.Router();

let sha512 = function (password) {
  var hash = crypto.createHash('sha512');
  hash.update(password);
  var value = hash.digest('hex');
  return value;
};

function createAuthToken(userID) {
  var token = jwt.sign({
    userID: userID
  }, Config.secret);

  return token;
}

function parseAuthToken(token) {
  try {
    var decoded = jwt.verify(token, Config.secret);
    return decoded.userID;
  } catch (err) {
    winston.log('warn', 'Failed to decode jsonwebtoken: ' + err);
    return null;
  }
}

router.post('/register', (req, res) => {
  let data = req.body.user;

  data.username = snakeify(data.username.trim());
  data.banned = false;
  data.registered = new Date();
  data.password = sha512(data.password);
  data.sold = 0;
  data.bought = 0;
  data.subscribed = false;

  if (data.username.length > 24) {
    res.json({
      success: false,
      messages: Messages.too_long_nickname
    });
    return;
  }

  UserService.register(data, (ok, doc) => {
    if (!ok) {
      res.json({
        success: false,
        message: Messages.register_error
      });
      return;
    }

    if (!doc) {
      res.json({
        success: false,
        message: Messages.register_user_exists
      });
      return;
    }

    Notifications.sendSystemMessage(data.username, Messages.welcome_notification);

    res.json({
      success: true
    });
  });
});

router.post('/login', (req, res) => {
  let username = req.body.username;
  let pass = sha512(req.body.password);

  UserService.findUserByCreditinals(username, pass, (ok, user) => {
    if (!ok) {
      res.json({
        success: false,
        message: Messages.login_error
      });
      return;
    }

    if (!user) {
      res.json({
        success: false,
        message: Messages.login_invalid_data
      });
      return;
    }

    if (user.banned) {
      res.json({
        success: false,
        message: Messages.login_banned
      });
      return;
    }
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    winston.info('[Login] User '+username+' logged in from '+ip);

    res.json({
      success: true,
      token: createAuthToken(user._id)
    });
  });
});

router.get('/me/:token', (req, res) => {
  var id = parseAuthToken(req.params.token);

  if (!id) {
    res.json({
      success: false
    });
    return;
  }

  UserService.findById(id, (ok, user) => {
    if (!ok || !user) {
      res.json({
        success: false
      });
      return;
    }

    if (user.banned) {
      res.json({
        success: false
      });
      return;
    }

    res.json({
      success: true,
      user: user
    });
  });

});

function privateHandler(req, res, next) {

  let token = req.params.token || req.body.token || '';

  var id = parseAuthToken(token);

  if (!id) {
    res.json({
      success: false,
      message: 'Access denied.'
    });
    return;
  }

  UserService.findById(id, (ok, user) => {
    if (!ok || !user) {
      res.json({
        success: false,
        message: 'Access denied.'
      });
      return;
    }

    if (user.banned) {
      res.json({
        success: false,
        message: 'User is banned.'
      });
      return;
    }

    req.user = user;
    next();
  });

}

module.exports = {
  router,
  privateHandler
};