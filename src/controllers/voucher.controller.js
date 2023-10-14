const {order: OrderModel, voucher: voucherModel}  = require("../models/order.model");

exports.addVoucherDetails = async (req, res) => {
    try{
        const myId = req.params.id;
        const { name, quantity, unit, price
        } = req.body[0];
        console.log(req.body[0].name)
        const voucherId = Math.floor(Math.random() * 100);

        const voucher = await voucherModel.create({
            id: voucherId,
            orderId: myId,
            name: name,
            quantity: quantity,
            price: price,
            unit: unit
        });
        res.status(201).json({ data: voucher, status: "success" });

    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}

exports.viewVoucherDetails = async (req, res) => {
     
    try{
        const orderId = req.params.id;
        const vouchers = await voucherModel.find({orderId: orderId})
        if(vouchers.length > 0){
            res.status(201).json({ data: vouchers, status: "success" });
        }
        else{
            res.json({ message: "No vouchers found" });
        }
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}

exports.addVoucherAdditionalData = async (req, res) => {
    try{
        const id = req.params.id;
        const voucher = await voucherModel.find({id: id})
        const { billingWeight, kantaWeight, qualityClaimPercent, qualityClaim
        } = req.body;
        
        if(voucher.length > 0){
            const voucher = await voucherModel.findOneAndUpdate({id:id}, 
                {
                    billingWeight:billingWeight,
                    kantaWeight:kantaWeight, 
                    qualityClaimPercent: qualityClaimPercent, 
                    qualityClaim: qualityClaim
                },
                { new : true}
            );
            const allVoucher = await voucherModel.find({orderId: voucher.orderId})
            const orderDetails = await OrderModel.findOneAndUpdate({id: voucher.orderId},
                {voucher: allVoucher}
            );
            res.status(201).json({ data: voucher,orderDetails, status: "Voucher updated" });
        }
        else{
            res.json({ message: "No vouchers found" });
        }
    

    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}

