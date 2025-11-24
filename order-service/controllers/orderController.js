const Order = require('../models/orderModel');

const createOrder = async (req, res) => {
    try {
        const { user_id, car_id, total_price } = req.body;
        const orderId = await Order.create({ user_id, car_id, total_price });
        res.status(201).json({ message: 'Order created successfully', orderId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getOrdersByUser = async (req, res) => {
    try {
        const orders = await Order.findByUserId(req.params.userId);
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        await Order.updateStatus(req.params.id, status);
        res.json({ message: 'Order status updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createOrder,
    getOrdersByUser,
    getOrderById,
    updateOrderStatus
};
