const express = require("express");
const {
    addVoucherDetails,
    viewVoucherDetails,
    addVoucherAdditionalData
} = require("../controllers/voucher.controller");
const router = express.Router();

router.route("/addVoucherDetails/:id").post(addVoucherDetails);
router.route("/addVoucherAdditionalData/:id").put(addVoucherAdditionalData);
router.route("/viewVoucherDetails/:id").get(viewVoucherDetails);

module.exports = router;

