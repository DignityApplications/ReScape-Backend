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

var panelSchema = mongoose.Schema({
    name: { //An identifier for the scene (not for public display, only for the backend)
        type: String,
        default: 'Unnamed panel',
        required: true,
    },
    sequence: { //The sequence of this panel in the scene. This will be the order in which the panels appear when swiping through
        type: Number,
        min: 0,
        required: true,
    },
    scene: { //Create a reference back to the scene
        type: ObjectId,
        ref: 'Scene',
        required: true
    },
    room: { //Create a reference back to the room
        type: ObjectId,
        ref: 'Room',
        required: true
    },
    imageOverlay: imgSchema, //This is the image that gets laid over the background image specified in the scene
    password: { //For grid-based password panels. If there is no password, the panel isn't of that type
        type: [[Number]],
        required: false,
    }    
}, {timestamps: true});

var Panel = module.exports = mongoose.model('Panel', panelSchema);