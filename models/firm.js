const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const firmSchema = new Schema({
    name: String,
    gstin: String
});

module.exports = mongoose.model('Firm', firmSchema);
