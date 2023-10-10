const OrderModel = require("../models/order.model");
const PurchaseModel = require("../models/purchase.model");

exports.placeOrder = async (req, res, next) => {
    const { id, productName, rate, bardanas, brokerage, deliveryTime, firmName, orderType, quantity
    } = req.body;
    const myId = Math.floor(Math.random() * 100);
    const voucherId = Math.floor(Math.random() * 100);
    console.log("nono")
    try {
        const order = await OrderModel.create({
            id: myId,
            date: Date.now(),
            productName,
            rate,
            bardanas,
            brokerage,
            deliveryTime,
            firmName,
            orderType,
            quantity,
            approvalStatus: "Pending",
            voucherId:voucherId
        });
        console.log("orders", order)
        res.status(201).json({ data: order, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.listOrders = async (req, res, next) => {
    
    try{
        const orders = await OrderModel.find()
        console.log("orderssss", orders)
        if(orders.length > 0){
            res.status(201).json({ data: orders, status: "success" });
        }
        else{
            res.json({ message: "No orders found" });
        }
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}

exports.viewOrder = async (req, res, next) => {
    
    try{
        const orderId = req.params.id;
        const orders = await OrderModel.find({id: orderId})
        if(orders.length > 0){
            res.status(201).json({ data: orders, status: "success" });
        }
        else{
            res.json({ message: "No orders found" });
        }
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}

exports.editOrder = async (req, res, next) => {
    const { id, productName, rate, bardanas, brokerage, deliveryTime, firmName, orderType
    } = req.body;
    try{

    const orderId = req.params.orderId;
    const orders = await OrderModel.find({id: orderId });
    // console.log(orders);

    if(orders.length > 0){
        // const order = await OrderModel.updateMany(
        //     { id: req.params.id },
        //     { $set: { approvalStatus: true } }
        //  );
        const order = await OrderModel.findOneAndUpdate({id:req.params.orderId}, 
            req.body
        );
        console.log("Order", order);
        res.status(201).json({ data: order, status: "Order updated" });
    }
    else{
        res.json({ message: "No orders found" });
    }
    }
    catch(error){
        res.status(500).json({ error: error.message }); 
    }
}

exports.approveOrder = async (req, res, next) => {
    try{
        const id = req.params.id;
        const orders = await OrderModel.find({id: id})
        if(orders.length > 0){
            const order = await OrderModel.updateMany(
                { id: req.params.id },
                { $set: { approvalStatus: "Approved" } }
             );
            res.status(201).json({ data: order, status: "Order Approved" });
        }
        else{
            res.json({ message: "No orders found" });
        }
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
    
}

exports.disapproveOrder = async (req, res, next) => {
    try{
        const id = req.params.id;
        const orders = await OrderModel.find({id: id})
        if(orders.length > 0){
            const order = await OrderModel.updateMany(
                { id: req.params.id },
                { $set: { approvalStatus: "Disapprove" } }
             );
            res.status(201).json({ data: order, status: "Order Approved" });
        }
        else{
            res.json({ message: "No orders found" });
        }
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
    
}


exports.purchaseVoucher = async (req, res, next) => {
    
    try{
        const id = req.params.id;
        const orders = await OrderModel.findOne({id: id})

    if (orders) {
      const purchaseDetails = await OrderModel.findOneAndUpdate(
        {id: id},
        {  voucher: req.body
    },
        {new: true} );
        res.status(201).json({ data: purchaseDetails, status: "success" });

    }
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}

exports.voucherDeductions = async (req, res, next) => {
    
    try{
        const id = req.params.id;
        const orders = await OrderModel.findOne({id: id})

    if (orders) {
      const deductionDetails = await OrderModel.findOneAndUpdate(
        {id: id},
        {deductions: req.body
    },
        {new: true} );
        res.status(201).json({ data: deductionDetails, status: "success" });

    }
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}

exports.addOptionalFields = async (req, res, next) => {
    
    try{
        const id = req.params.id;
        const orders = await OrderModel.findOne({id: id})

    if (orders) {
      const purchaseDetails = await OrderModel.findOneAndUpdate(
        {id: id},
        {  optionalFields: req.body
    },
        {new: true} );
        res.status(201).json({ data: purchaseDetails, status: "success" });

    }
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}


exports.viewOptionalFields = async (req, res, next) => {
    
    try{
        const id = req.params.id;
        const orders = await OrderModel.findOne({id: id})

   
        res.status(201).json({ data: orders.optionalFields, status: "success" });

    
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}
exports.addItem = async (req, res, next) => {
    
    try{
        const id = req.params.id;
        const orders = await OrderModel.findOne({id: id})

    if (orders) {
      const purchaseDetails = await OrderModel.findOneAndUpdate(
        {id: id},
        {  items: req.body
    },
        {new: true} );
        res.status(201).json({ data: purchaseDetails, status: "success" });

    }
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}


exports.viewItems = async (req, res, next) => {
    
    try{
        const id = req.params.id;
        const orders = await OrderModel.findOne({id: id})

   
        res.status(201).json({ data: orders.items, status: "success" });

    
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}