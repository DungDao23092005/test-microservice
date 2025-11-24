const db = require('../config/db');

const Car = {
    create: async (car) => {
        const [result] = await db.query(
            'INSERT INTO cars (brand, model, year, price, description, status) VALUES (?, ?, ?, ?, ?, ?)',
            [car.brand, car.model, car.year, car.price, car.description, car.status || 'available']
        );
        return result.insertId;
    },

    findAll: async () => {
        const [rows] = await db.query('SELECT * FROM cars');
        return rows;
    },

    findById: async (id) => {
        const [rows] = await db.query('SELECT * FROM cars WHERE id = ?', [id]);
        return rows[0];
    },

    update: async (id, car) => {
        await db.query(
            'UPDATE cars SET brand = ?, model = ?, year = ?, price = ?, description = ? WHERE id = ?',
            [car.brand, car.model, car.year, car.price, car.description, id]
        );
    },

    updateStatus: async (id, status) => {
        await db.query('UPDATE cars SET status = ? WHERE id = ?', [status, id]);
    },

    delete: async (id) => {
        await db.query('DELETE FROM cars WHERE id = ?', [id]);
    }
};

module.exports = Car;
