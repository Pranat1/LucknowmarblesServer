const { intersection } = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema({
    name: String,
    address: String,
    phone: Number,
    gps: String
});

module.exports = mongoose.model('Place', placeSchema);
