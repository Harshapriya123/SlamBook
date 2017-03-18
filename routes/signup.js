var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// define the SignUp route
router.post('/', function (req, res) {
  res.send('Signing Up!!')
})

// define the SignUp/Details route
router.get('/details', function (req, res) {
  res.send('About You')
})

module.exports = router