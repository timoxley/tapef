var test = require('../../')

test('pass', function(t) {
  t.pass('pass message')
  t.end()
})

test('pass', function(t) {
  t.comment('comment message')
  t.end()
})
