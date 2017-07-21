var express = require('express');
var router = express.Router();

//Models
var User = require('../models/user')
var Room = require('../models/room')

/* GET and POST to /rooms */
router.get('/room', function(req, res, next){
    res.render('forms/room')
})

router.post('/room', function(req, res, next){
    var name = req.body.name;
    var description = req.body.description;
    var difficulty = req.body.difficulty;

    var newRoom = new Room({ //Create the room object
        name: name,
        description: description,
        difficulty: difficulty,
    })

    newRoom.save(); //Save the new room

    res.redirect('/rooms'); //Redireect to the root
});

/* GET create/user */
router.get('/user', function(req, res, next){
    
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
