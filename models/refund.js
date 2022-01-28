const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const refundSchema = new Schema({
    
    dateTime: String,
    saleId: String

});

module.exports = mongoose.model('Refund', refundSchema);