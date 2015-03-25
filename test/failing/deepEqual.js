var test = require('../../')

test('deepEqual Object', function(t) {
  var a = {
    name: 'apple'
  }
  var b = {
    name: 'banana'
  }
  t.deepEqual(a, b)
  t.end()
})

test('deepEqual array', function(t) {
  var a = [1,2,3]
  var b = [3,2,1]
  t.deepEqual(a, b)
  t.end()
})


test('deepEqual bigger object', function(t) {
  var pkg = require('../../package.json')
  var pkg2 = JSON.parse(JSON.stringify(pkg))
  pkg2.dependencies.tape = '~3.0.3'
  pkg2.description = "Tape api with mocha's error output."
  t.deepEqual(pkg, pkg2)
  t.end()
})
