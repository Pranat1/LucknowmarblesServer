const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brokerSchema = new Schema({

    name: String,
    phone: Number, 
    email: String

});

module.exports = mongoose.model('Broker', brokerSchema);

