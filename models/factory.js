const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const factorySchema = new Schema({
    name: String,
    address: String,
    phone: String
});

module.exports = mongoose.model('Factory', factorySchema);