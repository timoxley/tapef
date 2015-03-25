var test = require('../../')

test('equal numbers', function(t) {
  t.deepEqual(1, 1)
  t.end()
})

test('equal string', function(t) {
  var a = 'apple'
  var b = 'apple'
  t.equal(a, b)
  t.end()
})
