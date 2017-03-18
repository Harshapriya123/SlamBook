var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// define the Login page route
router.get('/', function (req, res) {
  res.send('This is Login home page')
})

// define the Login/Details route
router.get('/details', function (req, res) {
  res.send('About You')
})

module.exports = router