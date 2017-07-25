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
    var themeColor = req.body.themeColor;

    var newRoom = new Room({ //Create the room object
        name: name,
        description: description,
        difficulty: difficulty,
        themeColor: themeColor,
    })

    console.log(newRoom)
    newRoom.save(); //Save the new room

    res.redirect('/rooms'); //Redirect to the rooms route
});

/* GET and POST to /user */
router.get('/user', function(req, res, next){
    res.render('forms/user')
});

router.post('/user', function(req, res, next){
    
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var password = req.body.password;

    var newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
    
    User.createUser(newUser, function(err, user){
        return  res.redirect('/users'); //Redirect to the users route
    });	

});

module.exports = router;
