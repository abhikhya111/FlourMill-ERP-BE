const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
    
    id: {
        type: Number
    },
    orderId: {
        type: Number
    },
    name: {
        type: String,
    },
    quantity: {
        type: Number
    },
    unit: {
        type: String
    },
    price: {
        type: Number
    },
    billingWeight: {
        type: Number
    },
    kantaWeight: {
        type: Number
    },
    qualityClaimPercent: {
        type: String
    },
    qualityClaim: {
        type: String
    }
    
    
})

const orderSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    date: {
       type: Date, 
    },
    productName: {
        type: String, 
        // required: true
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
    voucher: [voucherSchema],
    optionalFields: Array,
    items: Array,
    deductions: Object
    
})
module.exports = {order :mongoose.model("Order", orderSchema), voucher:mongoose.model("Voucher", voucherSchema)}

