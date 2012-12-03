module.exports = async =
  whilst: (a, b, c) ->
    `a() ? b(function(e){return e ? c(e) : async.whilst(a,b,c)}) : c()`

  series: (a, cb) ->
    a.push cb ?= ->
    (next = (err, result) ->
      a = [a[a.length-1]] if err
      a.shift()(next, err, result)
      return
    )()
    return

  parallel: (a, cb) ->
    a.push cb ?= ->
    next = (err) ->
      a.shift()
      if err or 1 is a.length
        a[a.length-1](err)
        a = []
      return
    for i of a when i < a.length-1
      a[i](next)
    return
