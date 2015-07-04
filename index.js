"use strict"

var tape = require('tape')
var through = require('through2')
var path = require('path')
var color = require('./reporter').color
var utils = require('./utils')
var inlineDiff = require('./reporter').inlineDiff
var unifiedDiff = require('./reporter').unifiedDiff
var defined = require('defined');
var createDefaultStream = require('tape/lib/default_stream');
var defaultStream = require('tape/lib/default_stream')
var Test = require('tape/lib/test')

require('./reporter').useColor = true

var canEmitExit = typeof process !== 'undefined' && process
    && typeof process.on === 'function' && process.browser !== true
;
var canExit = typeof process !== 'undefined' && process
    && typeof process.exit === 'function'
;

var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

process.on('exit', function() {
  if (test._results.fail) return process.exit(1)
  else process.exit(0)
})

var output = ''
if (process.browser) {
  process.stdout = through(function(chunk, enc, cb) {
    output += chunk
    if (!output) {
      process.nextTick(function() {
        console.log(output)
        output = ''
      })
    }
    cb()
  })
}

var test = createExitHarness({objectMode: true})
var ts = test._stream

  test._results.on('done', function() {
    console.log('\n1..' + test._results.count);
    console.log('# tests ' + test._results.count);
    console.log('# pass  ' + test._results.pass);
    if (test._results.fail) console.log('# fail  ' + test._results.fail)
    tp.end()
  })

var tp = ts.pipe(through.obj({end: false},function(t, enc, cb) {
  if (t.type === 'assert') {
    console.log(encodeResult(t, t.test))
  }
  if (t.type === 'test') {
    console.log('# ' + t.name)
  }
  cb()
}))

function createExitHarness (conf) {
    if (!conf) conf = {};
    var harness = tape.createHarness({
        autoclose: defined(conf.autoclose, false)
    });
    
    var stream = harness.createStream({ objectMode: conf.objectMode });
    harness._stream = stream
    var es = stream.pipe(conf.stream || createDefaultStream());
    if (canEmitExit) {
        es.on('error', function (err) { harness._exitCode = 1 });
    }
    
    var ended = false;
    stream.on('end', function () { ended = true });
    
    if (conf.exit === false) return harness;
    if (!canEmitExit || !canExit) return harness;
    
    var _error;

    process.on('uncaughtException', function (err) {
        if (err && err.code === 'EPIPE' && err.errno === 'EPIPE'
        && err.syscall === 'write') return;
        
        _error = err
        
        throw err
    })

    process.on('exit', function (code) {

        if (_error) {
            return
        }

        if (!ended) {
            var only = harness._results._only;
            for (var i = 0; i < harness._tests.length; i++) {
                var t = harness._tests[i];
                if (only && t.name !== only) continue;
                t._exit();
            }
        }
        harness.close();
        process.exit(code || harness._exitCode);
    });
    return harness;
}

function encodeResult (test, count) {
    var output = '';
    var name = test.name ? ' ' + test.name.toString().replace(/\s+/g, ' ') : '';
    output += (test.ok ? 'ok ' : 'not ok ') + count;
    output += name

    if (test.skip) output += ' # SKIP';
    else if (test.todo) output += ' # TODO';

    output += '\n';
    if (test.ok) return output;

    var outer = '  ';
    var inner = outer + '  ';
    output += outer + '---\n';
    output += inner + 'operator: ' + test.operator + '\n';

    if (test.operator === 'fail') {
      output += color('error message', '\n      ' + name + '\n\n')
    }

    if (has(test, 'expected') || has(test, 'actual')) {
      // format
      var fmt = color('error title', '  %s) %s:\n')
        + color('error message', '     %s')
        + color('error stack', '\n%s\n');

      // msg
      var err = test.error
        , message = err.message || ''
        , stack = err.stack || message
        , index = stack.indexOf(message) + message.length
        , msg = stack.slice(0, index)
        , actual = test.actual
        , expected = test.expected
        , escape = true;

      // uncaught
      if (err.uncaught) {
        msg = 'Uncaught ' + msg;
      }

      // explicitly show diff
      if (sameType(actual, expected)) {
        test.operator
        escape = false;
        err.actual = actual = utils.stringify(actual);
        err.expected = expected = utils.stringify(expected);
      }

      // actual / expected diff
      if ('string' == typeof actual && 'string' == typeof expected) {
        fmt = color('error title', '  %s) %s:\n%s') + color('error stack', '\n%s\n');
        var match = message.match(/^([^:]+): expected/);
        msg = '\n      ' + color('error message', match ? match[1] : msg);
        msg += inlineDiff(err, escape);
      }

      // indent stack trace without msg
      stack = stack.slice(index ? index + 1 : index)
        .replace(/^/gm, '  ');

      output += msg + '\n'
    }

    if (test.at) {
        output += inner + 'at: ' + test.at + '\n';
    }
    if (test.operator === 'error' && test.actual && test.actual.stack) {
        var lines = String(test.actual.stack).split('\n');
        output += inner + 'stack:\n';
        output += inner + '  ' + lines[0] + '\n';
        for (var i = 1; i < lines.length; i++) {
            output += inner + lines[i] + '\n';
        }
    }

    output += outer + '...\n';
    return output.replace(/\\n/g, '\n');
}

function has (obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}


function sameType(a, b) {
  a = Object.prototype.toString.call(a);
  b = Object.prototype.toString.call(b);
  return a == b;
}

var originalAssert = Test.prototype._assert

Test.prototype._assert = function assert(ok, opts) {
  var val = originalAssert.apply(this, arguments)
  if (val) val.err = new Error().stack.split('\n').slice(3)
  return val
};

module.exports = test
