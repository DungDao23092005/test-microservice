const db = require('../config/db');

const Payment = {
    create: async (payment) => {
        const [result] = await db.query(
            'INSERT INTO payments (order_id, amount, method, status) VALUES (?, ?, ?, ?)',
            [payment.order_id, payment.amount, payment.method, payment.status || 'pending']
        );
        return result.insertId;
    },

    findByOrderId: async (orderId) => {
        const [rows] = await db.query('SELECT * FROM payments WHERE order_id = ?', [orderId]);
        return rows[0];
    },

    updateStatus: async (id, status) => {
        await db.query('UPDATE payments SET status = ? WHERE id = ?', [status, id]);
    }
};

module.exports = Payment;
