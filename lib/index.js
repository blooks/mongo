'use strict';

var MongoClient = require('mongodb').MongoClient;
var log = require('coyno-log').child({component: 'mongo'});


var CoynoMongo = function (mongoUrl) {
  if (!mongoUrl) {
    throw new Error("Mongo url not set!");
  }
  this.mongoUrl = mongoUrl;
  this.db = null;
};

CoynoMongo.prototype.start = function (callback) {
  var self = this;
  MongoClient.connect(this.mongoUrl, function (err, database) {
    if (err) {
      log.error({error: err}, 'Can\'t connect to mongo');
      return callback && callback(err);
    }
    self.db = database;
    return callback && callback(null, database);
  });
};

CoynoMongo.prototype.stop = function (callback) {
  if (this.db) {
    this.db.close();
    return callback && callback(null, "done");
  } else {
    return callback && callback("No Db open", null);
  }
};


module.exports = CoynoMongo;
