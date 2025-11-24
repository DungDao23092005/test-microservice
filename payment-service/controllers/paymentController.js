const Payment = require('../models/paymentModel');

const processPayment = async (req, res) => {
    try {
        const { order_id, amount, method } = req.body;

        // Mock payment processing logic
        const status = 'success'; // Always success for demo

        const paymentId = await Payment.create({ order_id, amount, method, status });
        res.status(201).json({ message: 'Payment processed successfully', paymentId, status });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getPaymentStatus = async (req, res) => {
    try {
        const payment = await Payment.findByOrderId(req.params.orderId);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.json({ status: payment.status, payment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    processPayment,
    getPaymentStatus
};
