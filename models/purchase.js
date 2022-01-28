const { intersection } = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
    brokerId: String,
    royaltyAmount: Number,
    weight: Number, 
    firmId: String,
    billDateTime: String,
    billNumber: String,
    logisticsId: String,
    factoryId: String
});

module.exports = mongoose.model('Purchase', purchaseSchema);
