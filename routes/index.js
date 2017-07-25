var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//Models
var User = require('../models/user')
var Room = require('../models/room')


/* Configure Passport local strategy */
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {
  	User.getUserByEmail(username.toLowerCase(), function(err, user){
  		if (!user){
  			return done(null, false, {message: 'Unknown Email.'});
  		}

  		User.comparePassword(password, user.password, function(err, isMatch){
  			if(isMatch){
  				return done(null, user);
  			} else {
  				return done(null, false, {message: 'Invalid password.'});
  			}
  		});
  	});
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

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


/* GET /users */
router.get('/users', function(req, res, next){ //We return every user
  User.find({}).exec(function(err, users){
    res.json(users);
  })
})

/* GET and POST to /login */
router.get('/login', function(req, res, next){
  res.render('forms/login')
})

router.post('/login', passport.authenticate('local', { successRedirect: '/loggedin',
                                                    failureRedirect: '/login' }));

/* GET /logout */
router.get('/logout', function(req, res, next) {
	req.logout();
	res.redirect('/login');
});


/* GET /loggedin */
router.get('/loggedin', function(req, res, next){
  if (req.user) res.send('You are logged in as ' + req.user.firstName + ' ' + req.user.lastName)
  else res.send('You are not logged in')
})
module.exports = router;
