var test = require('../../')

test('nesting', function(t) {
  t.plan(1)
  t.test('the child', function(t) {
    var a = [1,2,3]
    var b = [3,2,1]
    t.fail('no')
    t.deepEqual(a, b)
    t.test('more nesting', function(t) {
      t.ok(false)
      t.end()
    })
    t.end()
  })
  t.end()
})
