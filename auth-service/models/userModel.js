const db = require('../config/db');

const User = {
    create: async (user) => {
        const [result] = await db.query(
            'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
            [user.name, user.email, user.password_hash, user.role || 'user']
        );
        return result.insertId;
    },

    findByEmail: async (email) => {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    },

    findById: async (id) => {
        const [rows] = await db.query('SELECT id, name, email, role, created_at FROM users WHERE id = ?', [id]);
        return rows[0];
    }
};

module.exports = User;
