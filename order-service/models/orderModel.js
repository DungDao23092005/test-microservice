const db = require('../config/db');

const Order = {
    create: async (order) => {
        const [result] = await db.query(
            'INSERT INTO orders (user_id, car_id, total_price, status) VALUES (?, ?, ?, ?)',
            [order.user_id, order.car_id, order.total_price, order.status || 'pending']
        );
        return result.insertId;
    },

    findByUserId: async (userId) => {
        const [rows] = await db.query('SELECT * FROM orders WHERE user_id = ?', [userId]);
        return rows;
    },

    findById: async (id) => {
        const [rows] = await db.query('SELECT * FROM orders WHERE id = ?', [id]);
        return rows[0];
    },

    updateStatus: async (id, status) => {
        await db.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
    }
};

module.exports = Order;
