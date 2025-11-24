const express = require('express');
const router = express.Router();
const { processPayment, getPaymentStatus } = require('../controllers/paymentController');

router.post('/pay', processPayment);
router.get('/pay/status/:orderId', getPaymentStatus);

module.exports = router;
