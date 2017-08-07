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

var sceneSchema = mongoose.Schema({
    name: { //The name of the scene
        type: String,
        default: 'Unnamed Scene',
        required: true,
    },
    room: { //Create a reference back to the room
        type: ObjectId,
        ref: 'Room',
        required: true
    },
    backgroundImage: imgSchema, //The image that is displayed in the background of each panel
    panels: [{ //The panels that make up the scene
        type: ObjectId,
        ref: 'Scene',       
    }],
    sequence: { //The sequence of this scene in the room. I.E (Scene 1, 2, 3, etc.)
        type: Number,
        min: 0,
        required: true,
    },
    storyText: { //The text that is displayed after this scene is selected
        type: String,
        required: false,
    }
}, {timestamps: true}); //Enable timestamps

var Scene = module.exports = mongoose.model('Scene', sceneSchema);