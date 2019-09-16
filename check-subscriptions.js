let User = require('./server/db').User;
let Book = require('./server/db').Book;
let Notification = require('./server/db').Notification;


const mongoose = require('mongoose');
const moment = require('moment');

const lastSubscribeDate = moment().subtract(30, 'days').toDate();

let names = [];

function finish() {
  console.log('Done.');
  mongoose.disconnect();
  process.exit(0);
}

function updateBooks() {
  Book.update({
    publisher: { $in: names }
  }, {
    $set: {
      premium: false
    }
  }, {
    multi: true
  }, (berr, raw) => {
    if (berr) {
      console.error('Failed to update books: '+berr);
      process.exit(1);
      return;
    }

    console.log('Books updated.');
    sendNotifcations(names);
  });
}

function notify(idx) {
  if (idx >= names.length) {
    console.log('Notifications sent.');
    finish();
    return;
  }

  let n = names[idx];

  let _data = {
    user: n,
    type: 'subscription_end',
    content: {}
  };

  _data.date = new Date();
  _data.read = false;


  console.log();

  let doc = new Notification(_data);

  doc.save((serr) => {
      if (serr) {
        console.error('[Notifications] Failed to create notification: ');
        console.error(JSON.stringify(_data, null, 4));
        console.error('NError: ' + serr);
        return;
      }

      console.log('Notify: ['+n+']');
      notify(idx+1);
  });
}

function sendNotifcations() {
  notify(0);
}

function updateUsers() {
  User.update({
    subscribed: true,
    subscribeDate: {$lte: lastSubscribeDate}
  }, {
    $set: {
      subscribed: false
    }
  }, {
    multi: true
  }, (uerr, raw) => {
    if (uerr) {
      console.error('Failed to update users: '+uerr);
      process.exit(1);
      return;
    }

    console.log('Users updated.');
    updateBooks(names);
  });  
}

function doTheWork() {
  console.log('============');
  console.log('Starting subscription check at '+moment().format('DD.MM.YYYY HH:mm'));
  User.find({
    subscribed: true,
    subscribeDate: {$lte: lastSubscribeDate}
  }, (err, docs) => {
    if (err) {
      console.error('MongoDB error while fetching subscribers: '+err);
      process.exit(1);
      return;
    }
  
    if (!docs || docs.length == 0) {
      console.log('No users need subscription to be removed.');
      process.exit(0);
      return;
    }
  
    names = docs.map((val) => {
      return val.username;
    });

    console.log('Targets: '+names.join(', '));
  
    updateUsers();
  });
}



mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lendbook', {
  useNewUrlParser: true
}, function (err) {
  if (err) {
    console.error('MongoDB connection error:'+err);
    process.exit(1);
  } else {
    doTheWork();
  }
});