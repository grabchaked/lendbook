const mongoose = require('mongoose');

function connect(cb) {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lendbook', {
    useNewUrlParser: true
  }, function (err) {
    if (err) {
      cb(false, err);
    } else {
      cb(true, null);
    }
  });
}

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  phone: String,
  city: String,
  password: String,
  subscribed: Boolean,
  subscribeDate: Date,
  banned: Boolean,
  registered: Date,

  sold: Number,
  bought: Number,

  wishlist: [String]
});

const BookSchema = new mongoose.Schema({
  title: String,
  img: String,
  author: String,
  genre: [String],
  pages: Number,

  price: Number,
  trading: Boolean,
  tradeData: Number,

  date: Date,
  views: Number,

  publisher: String,
  archived: Boolean,
  premium: Boolean
});

/*
  Possible notification types:
  "purchase" - another user wants to buy your book.
  "subscription" - your subcription started
  "subscription_end" - your subscription ended
  "system" - message from the system (admins)
  "wishlist" - a book from wishlist appeared on site
*/
const NotificationSchema = new mongoose.Schema({
  user: String,
  type: String,
  content: mongoose.Schema.Types.Mixed,
  read: Boolean,
  date: Date
});

let User = mongoose.model("users", UserSchema);
let Book = mongoose.model("books", BookSchema);
let Notification = mongoose.model('notifications', NotificationSchema);

module.exports = {
  connect,
  User,
  Book,
  Notification
}
