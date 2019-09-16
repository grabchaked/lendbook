const AuthAPI = require('../auth');

const express = require('express');
const moment = require('moment');
let router = express.Router();

const winston = require('winston');

const ADMIN_NICKNAME = require('../../config.json').adminUsername;
const ADMIN_EMAIL = require('../../config.json').adminEmail;

const User = require('../../db').User;
const Book = require('../../db').Book;

const Notifications = require('../notifications');
const UserService = require('../user');

function adminHandler(req, res, next) {
  if (req.user.username != ADMIN_NICKNAME || req.user.email != ADMIN_EMAIL) {
    res.json({
      success: false,
      message: 'Access denied! Fuck off, little scriptkiddy!'
    });
    winston.log('warn','[AdminAccess] User '+req.user.username+' tried to access admin panel!');
    return;
  }

  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  winston.log('warn', '[AdminAccess] '+req.originalUrl+' from '+ip);

  next();
}

router.get('/stats/:token', AuthAPI.privateHandler, adminHandler, (req,res) => {
  let stats = {
    premiumCount: 0,
    users: 0,
    books: 0,
  };

  User.find({}, (err, docs) => {
    if (err) {
      res.json({
        success: false
      });
      winston.error('[Admin] failed to load user list for stats = '+err);
      return;
    }



    for (let i = 0; i <docs.length;i++) {
      let item = docs[i];

      if (item.subscribed) {
        stats.premiumCount++;
      }
    }

    stats.users = docs.length;

    Book.find({}, (err2, books) => {
      if (err2) {
        res.json({
          success: false
        });
        winston.error('[Admin] failed to load books list for stats = '+err2);
        return;
      } 

      stats.books = books.length;

      for (let i = 0; i < books.length; i++) {
        
      }

      res.json({
        success: true,
        stats
      });
    })
  });
});

router.get('/verify/:token', AuthAPI.privateHandler, adminHandler, (req, res) => {
  res.json({
    success: true
  });
});

router.get('/users/:token', AuthAPI.privateHandler, adminHandler, (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      winston.error('[Admin] failed to fetch all users : '+err);
      res.json({
        success: false
      });
      return;
    }

    res.json({
      success: true,
      users
    });
  });
});

router.post('/sendMessage', AuthAPI.privateHandler, adminHandler, (req, res) => {
  Notifications.sendSystemMessage(req.body.message.target, req.body.message.content);

  res.json({
    success: true
  });
});

router.post('/ban', AuthAPI.privateHandler, adminHandler, (req, res) => {
  UserService.banUser(req.body.target, (ok) => {
    if (!ok) {
      res.json({
        success: false
      });
      return;
    }

    res.json({
      success: true
    });
  });
});

router.post('/giveSubscription', AuthAPI.privateHandler, adminHandler, (req,res) => {
  User.update({
    username: req.body.target
  }, {
    $set: {
      subscribed: true,
      subscribeDate: new Date()
    }
  }, (err, raw) => {
    if (err) {
      winston.error('[Admin] Failed to give subscription to user '+req.body.target+': '+err);
      res.json({
        success: false
      });
      return;
    } 

    Book.update({
      publisher: req.body.target
    }, {
      $set: {
        premium: true
      }
    }, {
      multi: true
    }, (err2, raw2) => {
      if (err2) {
        res.json({
          success: false
        });
        winston.error('[Admin] Failed to set premium books for '+req.body.target+': '+err2);
        return;
      }

      let now = moment();
      let subEnd = now.add(30, 'days');

      Notifications.sendSubscriptionStart(req.body.target, subEnd.toDate());

      res.json({
        success: true
      });
    });
  });
});

router.post('/getBook', AuthAPI.privateHandler, adminHandler, (req,res) => {
  Book.findById(req.body.id, (err, doc) => {
    if (err || !doc) {
      res.json({
        success: false,
        message: 'Ошибка базы данных: '+err
      });
      return;
    }

    res.json({
      success: true,
      book: doc
    });
  })
});

router.post('/deleteBook', AuthAPI.privateHandler, adminHandler, (req,res) => {
  Book.findByIdAndRemove(req.body.id, (err, doc) => {
    if (err || !doc) {
      res.json({
        success: false,
        message: 'Ошибка базы данных: '+err
      });
      return;
    }

    Notifications.sendSystemMessage(doc.publisher, 'Ваше объявление по продаже книги <b>"'+doc.title+'"</b> было удалено за нарушение правил.');

    res.json({
      success: true
    });
  })
});

router.post('/updateBook', AuthAPI.privateHandler, adminHandler, (req,res) => {
  let data = req.body.data;

  delete data._id;
  delete data.id;
  
  Book.update({
    _id: req.body.id
  }, {
    $set: req.body.data
  }, {
    multi: false
  }, (err, doc) => {
    if (err || !doc) {
      res.json({
        success: false,
        message: 'Ошибка базы данных: '+err
      });
      return;
    }

    winston.info('[Admin] Changed book #'+req.body.id+' to '+JSON.stringify(data));

    res.json({
      success: true
    });
  })
});

module.exports = {
  router
}