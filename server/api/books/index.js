const Book = require('../../db').Book;
const winston = require('winston');

function addBook(_data, cb) {
  let data = _data;

  data.date = new Date();
  data.views = 0;
  data.archived = false;

  let book = new Book(data);
  book.save((err, doc) => {
    if (err) {
      winston.error('[Books] Failed to post new book: ' + data + ',err=' + err);
      cb(false, null);
    }

    cb(true, doc);
  });
}

function getLastBooks(cb) {
  Book.find({
    archived: false
  }).sort({ date: -1 }).limit(8).exec((err, docs) => {
    if (err) {
      winston.error('[Books] Failed to fetch latest books: ' + err);
      cb(false, null);
      return;
    }

    cb(true, docs);
  });
}

function getBookInfo(id, cb) {
  Book.findById(id, (err, doc) => {
    if (err || !doc) {
      cb(false,null);
      return;
    }

    cb(true, doc);
  })
}

function getUserBooks(user, cb) {
  Book.find({
    publisher: user
  }).sort({
    date: -1
  }).exec((err, docs) => {
    if (err) {
      winston.error('[BookService] Failed to load user books: '+user+', err='+err);
      cb(false, null);
      return;
    }

    cb(true, docs);
  });
}

function viewBook(id) {
  Book.update({
    _id: id
  }, {
    $inc: {views: 1}
  }, {
    multi: false
  }, (err, raw) => {
    if (err) {
      winston.error('[BookService] Failed to increment views for book #'+id+': '+err);
      return;
    }
  });
}

function searchBooks(q, cb) {
  Book.find({
   title :{
     $regex : '.*'+q+'.*', $options: 'i'
    },
    archived: false
  }).sort({date: -1}).exec((err, books) => {
    if (err) {
      winston.error('[BookService] Failed to search books, q='+q+': '+err);
      cb(false, null);
      return;
    }

    cb(true, books);
  });
}

function removeBook(id, cb) {
  Book.remove({
    _id: id
  }, (err, docs) => {
    if (err) {
      winston.error('[BookService] Book remove failed #'+id+': '+err);
      cb(false);
      return;
    }

    cb(true);
  }); 
}

function archiveBook(id) {
  Book.update({
    _id: id
  }, {
    $set: {
      archived: true
    }
  }, {
    multi: false
  }, (err, raw) => {
    if (err) {
      winston.error('[BookService] Book archivation failed: #'+id+', err='+err);
      return;
    }
  });
}

function countActiveUserBooks(user, cb) {
  Book.find({
    publisher: user,
    archived: false
  }, {
    _id: true,
    title: true
  }).countDocuments((err, count) => {
    if (err) {
      winston.error('[BookService] Failed to count books for usre: '+user+', '+err);
      cb(-1);
      return;
    }

    cb(count);
  });
}

module.exports = {
  addBook,
  getLastBooks,
  getBookInfo,
  getUserBooks,
  viewBook,
  searchBooks,
  removeBook,
  archiveBook,
  countActiveUserBooks
}