# Mini-Async.js

Minimalist asynchronous javascript flow control in 34 lines.
Inspired by [async](https://github.com/caolan/async) library.

# NOTICE

After I wrote this, I felt I had a good understanding of async and decided to write an improved version based on its minimalist approach.
Check out [Async2](https://github.com/mikesmullin/async2).

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

Another way to do serial or waterfall (in coffeescript) without libs is like so:

```coffeescript
an_async_task = (cb) ->
  serial = (err) ->
    return cb err if err
    # do something
    next err, result
  next = (err, result) ->
    return cb err if err
    # do something
    done err
  done = (err, result) ->
    return cb err if err
    # do something
    cb null, result
  serial null
```

or parallel (in coffeescript) without libs:

```coffeescript
an_async_task = (cb) ->
  parallel1 = ->
    # do something
    done err
  parallel2 = ->
    # do something
    done err
  done = (err) ->
    return cb err if err
    unless --count
      # do something
      cb null, result
  count = 2
  parallel1()
  parallel2()
```

TODO
----

* Conform to node.js callback standard (err, result). Right now its transposed because I [erroneously] thought it was better. Wouldn't take much to add that.
