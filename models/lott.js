const { intersection } = require('lodash');
const mongoose = require('mongoose');
const purchase = require('./purchase');
const Schema = mongoose.Schema;

const lottSchema = new Schema({
    
    lottNumber: String,
    productId: String,
    thickenss: Number,
    cost: Number,
    purchaseId: String
});

module.exports = mongoose.model('Lott', lottSchema);
