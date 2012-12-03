# Mini-Async.js

Minimalist asynchronous javascript flow control in 34 lines.
Inspired by [async](https://github.com/caolan/async) library.

## Quick Examples

```javascript
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
```
