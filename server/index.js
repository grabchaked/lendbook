const winston = require('winston');
const moment = require('moment');
const morgan = require('morgan');
const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const API = require('./api');

const DB = require('./db');

let app = null;

const myFormat = winston.format.printf(info => {
  var date = moment().format("DD.MM.YYYY hh:mm:ss");
  return '['+date+'] <'+info.level+'> : '+ info.message;
});


function initLogs() {
  let datenow = moment().format('DD-MM-YYYY');

  let logfile = 'logs/app-'+datenow+'.log';

  winston.clear();
  winston.configure({
    level: 'info',
    transports: [
      new winston.transports.File({
        filename: logfile,
        format: myFormat
      })
    ]
  });
}

function createServer() {
  let datenow = moment().format('DD-MM-YYYY');

  let logfile = 'logs/http-'+datenow+'.log';

  app = express();

  app.use(morgan('combined', {
    stream: fs.createWriteStream(logfile, {flags: 'a'})
  }));

  app.use(express.static(path.resolve(__dirname, '../dist')));
  app.use('/bookImages', express.static(path.resolve(__dirname, '../bookImages')));

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use('/api', API);
}

function startServer() {
  app.listen(process.env.PORT || 3000, () => {
    console.log('[Lendbook] Express server started on port '+(process.env.PORT || 3000));
    winston.info('[Main] Server started!');
  });
}

function launch() {
  initLogs();

  winston.info('\n\n');
  winston.info('!!! Lendbook Application Start !!!');
  createServer();

  DB.connect((ok, err) => {

    if (ok) {
      winston.info('[Main] Successfully connected to MongoDB.');
      winston.info('[Main] Starting Express HTTP server...');
      startServer();
    } else {
      winston.error('[Main] Failed to connect to MongoDB, error='+err);
    }
  });

 
}

module.exports = {
  launch
}