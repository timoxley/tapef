var test = require('../../')

test('equal numbers', function(t) {
  t.equal(1, 2)
  t.end()
})

test('equal string', function(t) {
  var a = 'apple'
  var b = 'banana'
  t.equal(a, b)
  t.end()
})

test('equal similar string', function(t) {
  var a = 'apple'
  var b = 'pineapple'
  t.equal(a, b)
  t.end()
})

test('equal array', function(t) {
  var a = [1,2,3]
  var b = [3,2,1]
  t.equal(a, b)
  t.end()
})

test('equal long string', function(t) {
  var a = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor justo et semper tristique. Vestibulum a eleifend velit, ut mollis ligula. Sed ultrices purus mauris, a porttitor neque rhoncus at. Integer bibendum placerat ligula, ac viverra arcu tempor sed. Praesent tincidunt aliquet efficitur. Sed in porta magna, nec aliquet odio. Maecenas non sem dui. Aliquam erat volutpat. Praesent dapibus tellus quis cursus finibus. Pellentesque vehicula tempus tellus vel semper. Maecenas congue urna rutrum massa interdum, id rutrum lectus lobortis. Curabitur volutpat ante in lectus pretium, ac elementum massa bibendum. Maecenas eu porta quam."
  // slight difference in string.
  var b = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor justo et semper tristique. Vestibulum a eleifend velit, ut mollis ligula. Sed ultrices purus mauris, nec aliquet odio. Integer bibendum placerat ligula, ac viverra arcu tempor sed. Praesent tincidunt aliquet efficitur. Sed in porta magna. Maecenas non sem dui. Aliquam erat volutpat. Praesent dapibus tellus quis cursus finibus. Pellentesque vehicula tempus tellus vel semper. Maecenas congue urna rutrum massa interdum, id rutrum lectus lobortis. Curabitur volutpat ante in lectus pretium, ac elementum massa bibendum. Maecenas eu porta quam."
  t.equal(a, b)
  t.end()
})
