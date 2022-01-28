const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sizeSchema = new Schema({

    length: Number,
    width: Number,
    height: Number

});

module.exports = mongoose.model('Size', sizeSchema);
