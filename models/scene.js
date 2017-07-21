var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.ObjectId;

var sceneSchema = mongoose.Schema({
    tempField: {
        type: String,
        default: 'Temporary'
    }
}, {timestamps: true});

var Scene = module.exports = mongoose.model('Scene', sceneSchema);