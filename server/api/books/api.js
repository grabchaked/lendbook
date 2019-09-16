const BookService = require('./index.js');
const UserService = require('../user');
const Notifciations = require('../notifications');

const AuthAPI = require('../auth');
const express = require('express');
const Messages = require('../messages.json');


const Config = require('../../config.json');

const winston = require('winston');

const fs = require('fs');
const path = require('path');

const multer = require('multer');

const BOOK_UPLOAD_FOLDER = 'bookImages/';

const RESIZE_LIMIT = 3 * 1024 * 1024;

let upload = multer({ dest: BOOK_UPLOAD_FOLDER, limits: {fileSize: 10 * 1024 * 1024} });

const { exec } = require('child_process');

let router = express.Router();

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function checkBookData(data) {
  if (!data) return false;
  if (!data.title || data.title.length < 2 || data.title.length > 256) return false;
  if (!data.author || data.author.length < 2 || data.author.length > 150) return false;
  if (!data.genre || !Array.isArray(data.genre) || !data.genre[0]) return false;
  if (!data.pages || !isNumeric(data.pages) || data.pages < 0 || data.pages > 2000000) return false;
  if (!data.trading) if (!data.price || !isNumeric(data.price) || data.price < 1 || data.price > 1000) return false;
  //if (!data.img || !data.img.replace('\\', '/').startsWith(BOOK_UPLOAD_FOLDER)) return false;
  return true;
}

function processWishlist(title, bid) {
  winston.info('[WishlistProcess] Processing wishlist for '+title);
  UserService.findUsersWithWishlist((users) => {
    let count = 0;
    let ts = new Date();

    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      let wl = user.wishlist;

      for (let j = 0; j < wl.length; j++) {
        if (title.toLowerCase().includes(wl[j].toLowerCase())) {
          count++;
          Notifciations.sendWishlist(user.username, title, bid);
          break;
        }
      }
    }

    let ms = new Date() - ts;
    winston.info('[WishlistProcess] Finished in '+ms+' ms for '+count+' users.');
  });
}

router.get('/latest', (req, res) => {
  BookService.getLastBooks((ok, books) => {
    if (!ok) {
      res.json({
        success: false
      });
      return;
    }

    res.json({
      success: true,
      books: books
    });
  });
});

router.get('/info/:id', (req, res) => {
  BookService.getBookInfo(req.params.id, (ok, book) => {
    if (!ok) {
      res.json({
        success: false
      });
      return;
    }

    BookService.viewBook(req.params.id);

    res.json({
      success: true,
      book: book
    });
  });
});

function _publish(_book, res) {
  BookService.addBook(_book, (ok, doc) => {
    if (!ok || !doc) {
      res.json({
        success: false,
        message: 'Не удалось опубликовать книгу. Попробуйте, пожалуйста, позже или обратитесь к администрации.'
      });
      return;
    }

    processWishlist(_book.title, doc._id);

    res.json({
      success: true,
      id: doc._id
    });
  });
}

router.post('/canPublish', AuthAPI.privateHandler, (req,res) => {
  if (req.user.subscribed) {
    res.json({
      success: true,
      result: true
    });
    return;
  }

  BookService.countActiveUserBooks(req.user.username, (count) => {
    if (count == -1) {
      res.json({
        success: false,
        result: false
      });
      return;
    }

    if (count >= Config.freeBookLimit) {
      res.json({
        success: true,
        result: false
      });
      return;
    }

    res.json({
      success: true,
      result: true
    });
  });
});

router.post('/publish', AuthAPI.privateHandler, (req, res) => {
  let _book = req.body.book;

  if (!checkBookData(_book)) {
    res.json({
      success: false,
      message: Messages.invalid_book_data
    });
    return;
  }

  //sanitize book data
  _book.price = Math.round(_book.price);

  _book.publisher = req.user.username;

  if (req.user.subscribed) {
    _book.premium = true;
    _publish(_book, res);
  } else {
    BookService.countActiveUserBooks(req.user.username, (count) => {
      if (count == -1) {
        res.json({
          success: false,
          message: 'Ошибка БД.'
        });
        return;
      }

      if (count >= Config.freeBookLimit) {
        res.json({
          success: false,
          message: 'Ваш лимит объявлений исчерпан.'
        });
        return;
      }

      _publish(_book, res);
    });
  }
});

router.post('/library', AuthAPI.privateHandler, (req,res) => {
  BookService.getUserBooks(req.user.username, (ok, books) => {
    if (!ok) {
      res.json({
        success: false
      });
      return;
    }

    res.json({
      success: true,
      list: books
    });
  });
});

router.post('/getBookPhone', AuthAPI.privateHandler, (req,res) => {
  UserService.getUser(req.body.target, (ok, user) => {
    if (!ok) {
      res.json({
        success: false
      });
      return;
    }

    res.json({
      success: true,
      phone: user.phone,
      city: user.city
    });
  });
});

router.post('/purchase', AuthAPI.privateHandler, (req,res) => {
  let buyer = req.user;
  let address = req.body.address;
  let fullname = req.body.fullname;
  let book = null;
  let seller = null;

  BookService.getBookInfo(req.body.book, (ok, _book) => {
    if (!ok || !_book) {
      winston.error('[PurchaseManager] Purchase canceled, book_fetch_error, '+req.body.book);
      res.json({
        success: false
      });
      return;
    }

    book = _book;

    if (book.archived) {
      res.json({
        success: false
      });
      return;
    }

    UserService.getUser(book.publisher, (ok, _seller) => {
      if (!ok || !_seller) {
        winston.error('[PurchaseManager] Purchase canceled, seller_fetch_error, '+book.publisher);
        res.json({
          success: false
        });
        return;
      }

      seller = _seller;

      let purchase_notif = {
        buyer: buyer,
        book: book,
        address: address,
        fullname: fullname
      };

      let purchase_accept_notif = {
        seller: seller,
        book: book
      };

      Notifciations.sendPurchase(seller.username, purchase_notif);
      Notifciations.sendAccept(buyer.username, purchase_accept_notif);

      BookService.archiveBook(book._id);

      res.json({
        success: true
      });

      winston.info('[PurchaseManager] Purchase accepted. ');
    });
  });
});

router.get('/search/:q', (req,res) => {
  BookService.searchBooks(req.params.q, (ok,books) => {
    if (!ok) {
      res.json({
        success: false
      });
      return;
    }

    res.json({
      success: true,
      results: books
    });
  });
});

router.post('/remove', AuthAPI.privateHandler, (req,res) => {
  BookService.getBookInfo(req.body.id, (ok, doc) => {
    if (!ok || !doc) {
      res.json({
        success: false,
        message: 'Ошибка базы данных.'
      });
      return;
    }

    if (doc.publisher != req.user.username) {
      res.json({
        success: false,
        message: 'Access denied, little haker'
      });
      return;
    }

    let imgURL = doc.img;

    BookService.removeBook(req.body.id, (ok2) => {
      if (!ok2) {
        res.json({
          success: false,
          message: 'Ошибка базы данных.'
        });
        return;
      }

      if (fs.existsSync(path.resolve(imgURL))) fs.unlinkSync(path.resolve(imgURL));

      winston.info('[BookAPI] Removed book '+doc.title+' published by '+doc.publisher+', token user: '+req.user.username);
      res.json({
        success: true
      });
    });
  });
});

router.post('/uploadImage/:token', AuthAPI.privateHandler, (req,res) => {
  upload.single('image')(req, res, function (err) {
    if (err) {
      res.json({
        success: false
      });
      winston.error('[BookAPI] Image upload failed: '+err);
      return;
    }

    if (req.file.size > RESIZE_LIMIT) {
      exec('mogrify -resize 50% '+req.file.path, (szerr, stdout, stderr) => {
        if (szerr) {
          winston.error('[Resize] Failed to resize image '+req.file.filename+': '+szerr);
          return;
        }

        winston.info('[Resize] Resized image '+req.file.path+': '+stdout);
      });
    }

    res.json({
      success: true,
      url: req.file.path
    });
  });
});

router.post('/report/:id', AuthAPI.privateHandler, (req,res) => {
  Notifciations.sendSystemMessage(Config.adminUsername, 'Жалоба на книгу '+req.params.id+' от пользователя '+req.user.username+': '+req.body.content.substring(0,128));
  res.json({
    success: true
  });
});

router.post('/wishlist/add', AuthAPI.privateHandler, (req,res) => {
  let item = req.body.item.substring(0, 48);

  if (!req.user.subscribed) {
    res.json({
      success: false,
      message: 'Список желаний доступен только пользователям с подпиской!'
    });
    return;
  }

  if (req.user.wishlist && req.user.wishlist.length >= 100) {
    res.json({
      success: false,
      message: 'Достигнут лимит списка желаний.'
    });
    return;
  }

  UserService.addToWishlist(req.user.username, item, (ok) => {
    res.json({
      success: ok,
      message: 'Не удалось добавить книгу в список желаний.'
    });
  });
});

router.post('/wishlist/remove', AuthAPI.privateHandler, (req,res) => {
  let item = req.body.item.substring(0, 48);

  if (!req.user.subscribed) {
    res.json({
      success: false,
      message: 'Список желаний доступен только пользователям с подпиской!'
    });
    return;
  }

  UserService.removeFromWishlist(req.user.username, item, (ok) => {
    res.json({
      success: ok,
      message: 'Не удалось удалить книгу из списка желаний.'
    });
  });
});

module.exports = {
  router
};
