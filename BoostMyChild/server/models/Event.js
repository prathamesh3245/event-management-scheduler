const mongoose = require('mongoose');

const Eventschema = new mongoose.Schema({
    title: { type: String, required: true},
    description: {type: String},
    start: {type: Date, required: true},
    end: {type: Date, required: true},
    allDay: {type: Boolean, default: false}

}, {
    timestamps: true
});

module.exports = mongoose.model('Event', Eventschema);




