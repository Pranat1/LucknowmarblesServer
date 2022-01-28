const { intersection } = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
    brokerId: String,
    royelty: Number,
    weight: Number, 
    firmId: String,
    invoiceDateTime: String,
    billNumber: Number,
    logisticsId: String,
    factoryId: String
});

module.exports = mongoose.model('Purchase', purchaseSchema);
