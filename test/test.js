var async, count, delay;

sync = require('mini-async');

delay = function(f) {
  return setTimeout(f, Math.random() * 100 * Math.random() * 10);
};

console.log("series started.");

async.series([
  function(next, err, result) {
    return delay(function() {
      console.log(['a', next, err, result]);
      return next(err, 1);
    });
  }, function(next, err, result) {
    return delay(function() {
      console.log(['b', next, err, result]);
      return next(err, 2);
    });
  }, function(next, err, result) {
    return delay(function() {
      console.log(['c', next, err, result]);
      return next(err, 3);
    });
  }, function(next, err, result) {
    console.log(['d', next, err, result]);
    return next(err, 4);
  }
], function(next, err, result) {
  if (err) {
    return console.log(['series complete with error', next, err, result]);
  }
  return console.log(["series complete.", next, err, result]);
});

console.log("parallel started.");

async.parallel([
  function(next) {
    return delay(function() {
      console.log(['e', next]);
      return next();
    });
  }, function(next) {
    return delay(function() {
      console.log(['f', next]);
      return next();
    });
  }, function(next) {
    console.log(['g', next]);
    return next();
  }
], function(err) {
  if (err) {
    return console.log(['parallel complete with error', err]);
  }
  return console.log(["parallel complete.", err]);
});

console.log('start whilst');

count = 0;

async.whilst((function() {
  console.log('my a');
  return count < 5;
}), (function(cb) {
  console.log('my b');
  count++;
  delay(cb);
}), (function(err) {
  console.log('my c');
}));
