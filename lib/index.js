'use strict';

var MongoClient = require('mongodb').MongoClient;
var log = require('coyno-log').child({component: 'mongo'});

var db = null;

var start = function (callback) {

  if (!process.env.MONGO_URL) {
    return callback && callback(new Error("Mongo url not set!"));
  }
  MongoClient.connect(process.env.MONGO_URL, function (err, database) {
    if (err) {
      log.error({error: err}, 'Can\'t connect to mongo');
      return callback && callback(err);
    }
    db = database;
    return callback && callback(null, db);
  });
};

var stop = function (callback) {
  if (this.db) {
    this.db.close();
    return callback && callback(null, "done");
  } else {
    return callback && callback("No Db open", null);
  }
};

module.exports = {
  start: start,
  stop: stop
};

Object.defineProperty(module.exports, 'db', {
  get: function () {
    return db;
  },
  enumerable: true
});
