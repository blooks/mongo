var coynomongo = require('./index');

coynomongo.start(function(err, db) {
  if (err) {
    console.log(err)
  } else {
    console.log(db);
    coynomongo.stop(function(err,result) {
      if (err) {
        console.log(err);
      } else  {
        console.log(result);
      }
    });

  }
});
