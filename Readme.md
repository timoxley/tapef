# tapef

Tape bred uncermoniously with Mocha. Literally Mocha's reporter hacked into Tape.

The way I use this is to drop it in temporarily as a debugging tool when comparing big objects or strings, then switch back to vanilla Tape when I'm done.

## Caveats

Doesn't play well alongside other Tape tests just yet.

## Usage

Just replace `require('tape')` with `require('tapef')`.

```js
var test = require('tapef')

// Exactly the same api as Tape.
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

// etc

```

## Output

![image](https://cloud.githubusercontent.com/assets/43438/6817394/d02a6796-d2da-11e4-8f41-3c3e1ba88f7a.png)

![image](https://cloud.githubusercontent.com/assets/43438/6817861/af4dc03e-d2e1-11e4-8b2b-fcb6999b7857.png)

![image](https://cloud.githubusercontent.com/assets/43438/6817937/be1b7a9c-d2e2-11e4-9fb5-db39bae7bfa4.png)

## License

MIT
