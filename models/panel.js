var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.ObjectId;

var panelSchema = mongoose.Schema({
    tempField: {
        type: String,
        default: 'Temporary',
    },   
}, {timestamps: true});

var Panel = module.exports = mongoose.model('Panel', panelSchema);