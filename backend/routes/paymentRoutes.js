import express from'express'
import { initializePaystack, initializeFlutterwave, verifyPaystack, verifyFlutterwave } from'../controllers/paymentController.js'

const router = express.Router();

router.post("/paystack", initializePaystack);
router.post("/flutterwave", initializeFlutterwave);

router.get("/verify/paystack/:reference", verifyPaystack);
router.get("/verify/flutterwave/:transaction_id", verifyFlutterwave);

export default router;
