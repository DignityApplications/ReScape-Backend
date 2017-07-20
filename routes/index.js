var express = require('express');
var router = express.Router();

//Models
var User = require('../models/user')

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });

  User.find({}).exec(function(err, users){
    if (err) throw err;

    //Send JSON
    res.json(users);
  });

});

router.get('/addUser', function(req, res, next){
    
    var firstName = req.query.firstName;
    var lastName = req.query.lastName;
    var age = req.query.age;
    var netWorth = req.query.netWorth;

    var user = new User({
      firstName: firstName,
      lastName: lastName,
      age: age,
      netWorth: netWorth,
    });
    
    user.save();
    res.send('User added.')
});

module.exports = router;
