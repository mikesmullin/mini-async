var async;
module.exports = async = {
  whilst: function(a, b, c) {
    return a() ? b(function(e){return e ? c(e) : async.whilst(a,b,c)}) : c();
  },

  series: function(a, cb) {
    var next;
    a.push(cb != null ? cb : cb = function() {});
    (next = function(err, result) {
      if (err) {
        a = [a[a.length - 1]];
      }
      a.shift()(next, err, result);
    })();
  },

  parallel: function(a, cb) {
    var i, next;
    a.push(cb != null ? cb : cb = function() {});
    next = function(err) {
      a.shift();
      if (err || 1 === a.length) {
        a[a.length - 1](err);
        a = [];
      }
    };
    for (i in a) {
      if (i < a.length - 1) {
        a[i](next);
      }
    }
  }
};
