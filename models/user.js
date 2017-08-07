var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var userSchema = mongoose.Schema({
	firstName: { //The user's first name
		type: String,
		required: true,
        default: 'Elliot'
	},
	lastName: { //The user's last name
		type: String,
		required: true,
        default: 'Simpson'
	},
	email: { //The user's email address
		type: String,
		unique: true,
        dropDups: true,
		required: true,
		lowercase: true
	},
	password: { //the user's password
		type: String,
		required: true
	},
}, {timestamps: true}); //Enable timestamps (created_at, updated_at)

var User = module.exports = mongoose.model('User', userSchema);

module.exports.createUser = function(newUser, callback){ //This method is called with the newUser object to actually save it into the database
	bcrypt.genSalt(10, function(err, salt){
		if (err) throw err;
		bcrypt.hash(newUser.password, salt, function(err, hash){
			if (err) throw err;
			newUser.password = hash;
			newUser.save(callback);
		})
	});
}

module.exports.getUserById = function (id, callback){ //Pass in the ID and retrive the user
	User.findById(id, callback);
}

module.exports.getUserByEmail = function (email, callback){ //Pass in the email and retrieve the user
	var query = {email: email};
	User.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){ //Hash the entered password and compare it with the 
	bcrypt.compare(candidatePassword, hash, function(err, isMatch){
		if (err) throw err;
		callback(null, isMatch);
	});
}