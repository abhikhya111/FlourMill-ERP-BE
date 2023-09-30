const express = require("express");
const {
    placeOrder,
    listOrders,
    viewOrder,
    editOrder,
    approveOrder,
    disapproveOrder,
    purchaseVoucher,
    addOptionalFields,
    addItem,
    viewOptionalFields,
    viewItems,
    voucherDeductions
  } = require("../controllers/order.controller");
  const router = express.Router();

router.route("/").get(listOrders);
router.route("/placeOrder").post(placeOrder);
router.route("/:id").get(viewOrder);
router.route("/:orderId").post(editOrder);

router.route("/approveOrder/:id").post(approveOrder);
router.route("/disapproveOrder/:id").post(disapproveOrder);
router.route("/addFields/:id").post(addOptionalFields);
router.route("/addItem/:id").post(addItem);
router.route("/viewOptionalFields/:id").get(viewOptionalFields);
router.route("/viewItems/:id").get(viewItems);

router.route("/createVoucher/:id").post(purchaseVoucher);
router.route("/addDeductions/:id").post(voucherDeductions);

module.exports = router;

