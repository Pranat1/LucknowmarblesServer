const { intersection } = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colorSchema = new Schema({

    name: String,
    hex: String,

});

module.exports = mongoose.model('Color', colorSchema);
