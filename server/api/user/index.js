const User = require('../../db').User;
const winston = require('winston');

function exists(username, email, cb) {
  User.find({
    $or: [
      {
        username: username
      },
      {
        email: email
      }
    ]
  }, (err, docs) => {
    if (err) {
      winston.error('[UserService] Failed to find user ' + username + ' / ' + email + ': ' + err);
      cb(false, err);
      return;
    }

    if (docs.length == 0) {
      cb(false, null);
      return;
    }

    cb(true, null);
  });
}

function findUserByCreditinals(username, pass, cb) {
  User.findOne({
    $or: [
      {
        username: username
      },
      {
        email: username
      }
    ],
    password: pass
  }, (err, doc) => {
    if (err) {
      winston.error('[UserService] Failed to auth user ' + username + ' / ' + pass + ': ' + err);
      cb(false, err);
      return;
    }

    if (!doc) {
      cb(true, null);
      return;
    }

    cb(true, doc);
  });
}

function register(data, cb) {
  exists(data.username, data.email, (ok, err) => {
    if (err) {
      cb(false, err);
      return;
    }

    if (ok) {
      cb(true, null);
      return;
    }

    let user = new User(data);
    user.save((serr) => {
      if (serr) {
        cb(false, serr);
        return;
      }

      cb(true, user);
    });

  });
}

function findById(id, cb) {
  User.findById(id, {
    password: 0
  }, (err, doc) => {
    if (err) {
      winston.error('[UserService] Failed to find user by id ' + id + ': ' + err);
      cb(false, err);
      return;
    }

    if (!doc) {
      cb(true, null);
      return;
    }

    cb(true, doc);
  });
}

function banUser(username, cb) {
  User.update({
    username: username
  }, {
    $set: {
      banned: true
    }
  }, {
    multi: false
  }, (err, docs) => {
    if (err) {
      winston.error('[UserService] ADMIN Failed to ban user '+username+': '+err);
      cb(false);
      return;
    }
    winston.info('[UserService] Admin banned user '+username+', result: '+docs.toString());

    cb(true);
  });
}

function getUser(username, cb) {
  User.findOne({
    username: username
  }, (err, user) => {
    if (err || !user) {
      winston.error('[UserService] Failed to fetch user phone number: '+username+', err='+err);
      cb(false, null);
      return;
    }

    cb(true, user);
  });
}

function addToWishlist(user, item, cb) {
  User.updateOne({
    username: user
  }, {
    $push: {wishlist: item}
  }, (err, raw) => {
    if (err) {
      winston.error('[Wishlist] Failed to add to wishlist user '+user+' item '+item+': '+err);
      cb(false);
      return;
    }

    cb(true);
  });
}

function removeFromWishlist(user, item, cb) {
  User.updateOne({
    username: user
  }, {
    $pull: {wishlist: item}
  }, (err, raw) => {
    if (err) {
      winston.error('[Wishlist] Failed to remove from wishlist, user '+user+' item '+item+': '+err);
      cb(false);
      return;
    }

    cb(true);
  });
}

function findUsersWithWishlist(cb) {
  User.find({
    subscribed: true,
    wishlist: { $exists: true, $not: {$size: 0}}
  }, (err, docs) => {
    if (err || !docs) {
      winston.error('[Users/Wishlist] Failed to fetch users with wishlist: '+err);
      return;
    }

    cb(docs);
  });
}

module.exports = {
  register,
  findUserByCreditinals,
  exists,
  findById,
  banUser,
  getUser,
  addToWishlist,
  removeFromWishlist,
  findUsersWithWishlist
};