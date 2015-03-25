var test = require('../../')// require('tape')

test('deepEqual Object', function(t) {
  var a = {
    name: 'apple'
  }
  var b = {
    name: 'apple'
  }
  t.deepEqual(a, b)
  t.end()
})

test('deepEqual array', function(t) {
  var a = [1,2,3]
  var b = [1,2,3]
  t.deepEqual(a, b)
  t.end()
})
