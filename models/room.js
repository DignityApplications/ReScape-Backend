var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.ObjectId;

var imgSchema = mongoose.Schema({
	fileName: { //The new file name
		type: String,
	},
	originalName: { //The original file name
		type: String,
	}
});

var roomSchema = mongoose.Schema({
	name: { //The name of the room or experience
		type: String,
		required: true,
        default: 'Unnamed Room'
	},
    description: { //A detaild description of the room or experience
        type: String,
        required: false,
    },
    icon: imgSchema, //An icon that is associated with the room or experience
	difficulty: {
		type: Number,
		required: true,
        min: 1,
        max: 3,
	},
    scenes: [{ //The scenes that will make up the room or experience. 
        type: ObjectId,
        ref: 'Scene'
    }],
    completions: { //The number of times this room has been completed
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    timeLimit: { //The limit (in seconds). 0 is unlimited
        type: Number,
        required: true,
        default: 0,
    },
    themeColor: {
        type: String,
        default: '#ffffff',
        required: true,
    }
}, {timestamps: true});

var Room = module.exports = mongoose.model('Room', roomSchema);