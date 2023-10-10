const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    
    id: {
        type: Number,
    },
    date: {
       type: Date, 
    },
    productName: {
        type: String, 
        required: true
    },
    rate: {
        type: String, 
    },
    bardanas: {
        type: String, 
    },
    brokerage: {
        type: String, 
    },
    deliveryTime: {
        type: String
    },
    firmName:{
        type: String
    },
    orderType:{
        type: String
    },
    quantity: {
        type: String
    },
    approvalStatus: {
        type: String
    },
    voucherId:{
        type: String
    },
    voucher: Array,
    optionalFields: Array,
    items: Array,
    deductions: Object
    
})

module.exports = mongoose.model("Order", orderSchema);
