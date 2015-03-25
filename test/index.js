"use strict"

var fs = require('fs')
var path = require('path')
var spawn = require('child_process').spawn
var test = require('tape')

var FAILING = path.join(__dirname, 'failing')

var opts = {
  stdio: 'pipe'
}

var failingTests = fs.readdirSync(FAILING)
.map(function(testFile) {
  return path.join(FAILING, testFile)
})

failingTests.forEach(function(testFile) {
  var name = 'failing/' + path.basename(testFile)
  test(name, function(t) {
    spawn(process.execPath, [testFile], opts)
    .on('error', function() {
      t.fail('could not spawn ' + name)
    })
    .on('exit', function(code) {
      t.ok(code > 0, name + ' will exit non-zero')
      t.end()
    })
  })
})


var PASSING = path.join(__dirname, 'passing')

var passingTests = fs.readdirSync(PASSING)
.map(function(testFile) {
  return path.join(PASSING, testFile)
})

passingTests.forEach(function(testFile) {
  var name = 'passing/' + path.basename(testFile)
  test(name, function(t) {
    spawn(process.execPath, [testFile], opts)
    .on('error', function() {
      t.fail('could not spawn ' + name)
    })
    .on('exit', function(code) {
      t.equal(code, 0, name + ' will exit zero')
      t.end()
    })
  })
})
