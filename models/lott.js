const { intersection } = require('lodash');
const mongoose = require('mongoose');
const purchase = require('./purchase');
const Schema = mongoose.Schema;

const lottSchema = new Schema({
    
    lottNo: Number,
    productId: String,
    thickenss: Number,
    cost: Number,
    purchaseId: String
});

module.exports = mongoose.model('Lott', lottSchema);
