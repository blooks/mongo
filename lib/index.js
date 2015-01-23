'use strict';

var MongoClient = require('mongodb').MongoClient;
var log = require('coyno-log').child({component: 'mongo'});
var defaultConfig = require('coyno-config');

var db = null;

var start = function (config, callback) {
  if (! config) {
    config = defaultConfig.mongo;
  }

  MongoClient.connect(config.url, function (err, database) {
    if (err) {
      log.error({error: err}, 'Can\'t connect to mongo');
      return callback && callback(err);
    }
    log.debug('Connected to mongo');

    db = database;

    return callback && callback(null, db);
  });
};

module.exports = {
  start: start
};

Object.defineProperty(module.exports, 'db', {
  get: function () {
    return db;
  },
  enumerable: true
});
