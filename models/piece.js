const { intersection } = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pieceSchema = new Schema({
    pieceNumber: Number,
    placeId: String,
    length: Number,
    width: Number,
    lottId: String,

});

module.exports = mongoose.model('Piece', pieceSchema);
