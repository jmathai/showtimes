var showtimes = require('../src/index.js')
var test = require('tap').test
var moment = require('moment')
var s = null

test('no movies available for a date far in the future', function (t) {
  s = showtimes(90504, {
    date: 200
  })

  s.getTheaters(function (err) {
    var futureDate = moment().add(200, 'days').format('MMM D')
    t.equal(err, 'No showtimes were found on ' + futureDate + '.Please select a different date.')
    t.end()
  })
})

test('get theaters from zipcode', function (t) {
  s = showtimes(90504)
  s.getTheaters(function (err, theaters) {
    t.equal(err, null)
    t.ok(theaters.length > 1)
    t.end()
  })
})

test('get theaters from zipcode and get movie for first movie id', function (t) {
  s = showtimes(90504)
  s.getTheaters(function (err, theaters) {
    t.equal(err, null)
    s.getMovie((theaters[0].movies[0].id), function (err2, movie) {
      t.equal(err2, null)
      t.ok(movie.theaters[0].showtimes.length > 0)
    })

    t.end()
  })
})

test('get theaters from lat/long', function (t) {
  s = showtimes('33.8358,-118.3406')
  s.getTheaters(function (err, theaters) {
    t.equal(err, null)
    t.ok(theaters.length > 1)
    t.end()
  })
})

test('get theaters from lat/long', function (t) {
  s = showtimes('45.531531531531535,-122.61220863200342')
  s.getTheaters(function (err, theaters) {
    t.equal(err, null)
    t.ok(theaters.length > 1)
    t.end()
  })
})
