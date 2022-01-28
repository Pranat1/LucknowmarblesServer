const { intersection } = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({

    name: String,
    colorId: String,
    typeId: String

});

module.exports = mongoose.model('Product', productSchema);
