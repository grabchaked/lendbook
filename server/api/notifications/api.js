const express = require('express');
const AuthAPI = require('../auth');
const Notifications = require('../notifications');

let router = express.Router();

router.get('/:token', AuthAPI.privateHandler, (req, res) => {
  Notifications.getUserNotifications(req.user.username, (ok, items) => {
    if (!ok) {
      res.json({
        success: false
      });
      return;
    }

    Notifications.markAsRead(req.user.username);

    res.json({
      success: true,
      list: items
    });
  });
});

router.get('/:token/unread', AuthAPI.privateHandler, (req, res) => {
  Notifications.getUnreadCount(req.user.username, (ok, count) => {
    if (!ok) {
      res.json({
        success: false
      });
      return;
    }

    res.json({
      success: true,
      count: count
    });
  })
});

module.exports = {
  router
}