const Notification = require('../../db').Notification;
const winston = require('winston');

function sendNotification(data, cb) {
  let _data = data;

  _data.date = new Date();
  _data.read = false;

  let doc = new Notification(_data);

  doc.save((serr) => {
    if (serr) {
      winston.error('[Notifications] Failed to create notification: ');
      winston.error(JSON.stringify(_data, null, 4));
      winston.error('NError: ' + serr);
    }
  });
}

function sendSystemMessage(user, message) {
  let notification = {
    user: user,
    type: 'system',
    content: {
      message: message
    }
  };
  sendNotification(notification);
}

function sendSubscriptionStart(user, endDate) {
  let notification = {
    user: user,
    type: 'subscription',
    content: {
      end: endDate
    }
  };
  sendNotification(notification);
}

function sendSubscriptionEnd(user) {
  let notification = {
    user: user,
    type: 'subscription_end',
    content: {}
  };
  sendNotification(notification);
}

function sendWishlist(user, title, bid) {
  let notification = {
    user: user,
    type: 'wishlist',
    content: {
      title: title,
      bookID: bid
    }
  };
  sendNotification(notification);
}

function sendPurchase(user, purchaseData) {
  let notification = {
    user: user,
    type: 'purchase',
    content: {
      buyer: purchaseData.buyer.username,
      bookID: purchaseData.book._id,
      title: purchaseData.book.title,
      phone: purchaseData.buyer.phone,
      address: purchaseData.address,
      fullname: purchaseData.fullname
    }
  };
  sendNotification(notification);
}


function sendAccept(user, purchaseData) {
  let notification = {
    user: user,
    type: 'purchase_accepted',
    content: {
      seller: purchaseData.seller.username,
      bookID: purchaseData.book._id,
      title: purchaseData.book.title,
      phone: purchaseData.seller.phone
    }
  };
  sendNotification(notification);
}

function getUserNotifications(user, cb) {
  Notification.find({
    user: user
  }).sort({ date: '-1' }).exec((err, docs) => {
    if (err) {
      winston.error('[Notifications] Failed to fetch user notifications: ' + user + ', err=' + err);
      cb(false, null);
      return;
    }

    cb(true, docs);
  })
}

function markAsRead(user) {
  Notification.update({
    user: user,
    read: false
  }, {
      $set: {
        read: true
      }
    }, {
      multi: true
    }, (err, docs) => {
      if (err) {
        winston.error('[Notifications] Failed to markAsRead user notifications: ' + user + ', err=' + err);
        return;
      }

    })
}

function getUnreadCount(user, cb) {
  Notification.countDocuments({
    user: user,
    read: false
  }, (err, count) => {
    if (err) {
      cb(false, null);
      return;
    }

    cb(true, count);
  })
}

module.exports = {
  sendNotification,
  sendPurchase,
  sendSubscriptionEnd,
  sendSubscriptionStart,
  sendSystemMessage,
  getUserNotifications,
  markAsRead,
  getUnreadCount,
  sendAccept,
  sendWishlist
}