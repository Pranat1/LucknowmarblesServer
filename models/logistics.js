const { intersection } = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logisticsSchema = new Schema({
    
    date: String,
    biltyNumber: String,
    freightNumber: String,
    freightCost: Number,
    loadingCost: Number,
    unloadingCos: Number,
    weight: Number, 
});

module.exports = mongoose.model('Logistics', logisticsSchema);
