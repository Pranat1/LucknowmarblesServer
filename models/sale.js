const { intersection } = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saleSchema = new Schema({
    billAmount: Number,
    billDateTime: String, 
    billNumber: Number,
    customerName: String,
    quantity: Number,
    length: Number,
    width: Number,
    pieceId: String,
    cutProductId: String
});

module.exports = mongoose.model('Sale', saleSchema);
