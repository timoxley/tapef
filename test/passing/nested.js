var test = require('../../')

test('nesting', function(t) {
  var done = function() {
    t.end()
  }
  t.test('the child', function(t) {
    var a = [1,2,3]
    var b = [1,2,3]
    t.deepEqual(a, b)
    t.end()
    setTimeout(function() {
      done()
    })
  })
})
