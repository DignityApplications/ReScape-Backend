var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var crypto = require('crypto');

//Models
var User = require('../models/user')
var Room = require('../models/room')
var Scene = require('../models/scene')

//Multer and upload configuration
//Upload file extension
var storage = multer.diskStorage({
	destination: function (req, file, cb){
		cb(null, './public/uploads/');
	},
	filename: function (req, file, cb) {
			crypto.pseudoRandomBytes(16, function(err, raw){
				if (err) throw err;
				cb(null, raw.toString('hex') + Date.now() + '.jpg'); //Appending .jpg
			});
	},
});

//Upload directory and file filter
var uploading = multer({
	storage: storage,
	fileFilter: function(req, file, cb){
		if (path.extname(file.originalname) !== '.jpg') {
			return cb(null, false);
		}
		cb(null, true);
	},
});

/* GET and POST to /rooms */
router.get('/room', function(req, res, next){
    res.render('forms/room')
});

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

    newRoom.save(); //Save the new room

    res.redirect('/rooms'); //Redirect to the rooms route
});

/* GET and POST to /scenes */
router.get('/scene', function(req, res, next){
    Room.find({}).exec(function(err, rooms){ //Get all of the rooms for the room dropdown
        res.render('forms/scene', {rooms: rooms})
    });
});

router.post('/scene', uploading.single('backgroundImage'), function(req, res, next){
    Room.findOne({_id: req.body.room}).exec(function(err, room){
        if (room) {

            var name = req.body.name;
            var storyText = req.body.storyText;
            var roomID = req.body.room;
            var sequence = req.body.sequence;

            var backgroundImage = (req.file) ? { //If a file has been uploaded
                fileName: req.file.filename,
                originalName: req.file.originalname
            } : null

            var newScene = new Scene({ //Create the new scene
                name: name,
                storyText: storyText,
                room: roomID,
                sequence: sequence,
                backgroundImage: backgroundImage,
            });

            newScene.save(); //Save the scene

            room.scenes.push(newScene._id); //Add the new scene the the scenes array for the room

            room.save(); //Save the room

            res.redirect('/scenes')
        } else {
            res.redirect('/create/scene')
        }


    });
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
