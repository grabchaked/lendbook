const express = require('express');
let router = express.Router();

const AuthAPI = require('./auth');
const NotificationsAPI = require('./notifications/api.js');
const BooksAPI = require('./books/api.js');
const AdminAPI = require('./admin/api.js');

router.use('/auth', AuthAPI.router);
router.use('/notifications', NotificationsAPI.router);
router.use('/books', BooksAPI.router);
router.use('/admin', AdminAPI.router);

module.exports = router;