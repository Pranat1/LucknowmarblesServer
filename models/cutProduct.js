const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cutProductSchema = new Schema({
  
    cost: Number,
    productId:String,
    sizeId: String,
    quantity: Number,
    purchaseId: String,
    placeId: String

});
module.exports = mongoose.model('CutProduct', cutProductSchema);
