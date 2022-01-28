const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const typeSchema = new Schema({
    name: String,
    isCut: Boolean
});

module.exports = mongoose.model('Type', typeSchema);
