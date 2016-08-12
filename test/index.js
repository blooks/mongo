var Mongo = require('../index')

var MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/blooks'

describe('@blooks/mongo tests', () => {
  describe('Start stop tests', () => {
    it('should start and stop the mongo db connection', (done) => {
      var mongo = new Mongo(MONGO_URL)
      mongo.start((err) => {
        if (err) {
          return done(err)
        }
        mongo.stop(done)
      })
    })
  })
})
