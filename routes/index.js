var express = require('express');
var router = express.Router();

//Models
var User = require('../models/user')
var Room = require('../models/room')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('There is nothing here. You must request a valid API route.');
});

/* GET /rooms */
router.get('/rooms', function(req, res, next) { //We return every room
  Room.find({}).exec(function(err, rooms){
    res.json(rooms);
  });
});

module.exports = router;
