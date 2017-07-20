var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	firstName: {
		type: String,
		required: true,
        default: 'Elliot'
	},
	lastName: {
		type: String,
		required: true,
        default: 'Simpson'
	},
    age: {
        type: Number,
        required: true,
        default: 23
    },
    netWorth: {
        type: String,
        required: true,
        default: 'billionz',
    },
});

var User = module.exports = mongoose.model('User', userSchema);