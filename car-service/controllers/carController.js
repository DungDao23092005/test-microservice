const Car = require('../models/carModel');

const createCar = async (req, res) => {
    try {
        const { brand, model, year, price, description } = req.body;
        const carId = await Car.create({ brand, model, year, price, description });
        res.status(201).json({ message: 'Car created successfully', carId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getCars = async (req, res) => {
    try {
        const cars = await Car.findAll();
        res.json(cars);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getCarById = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.json(car);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateCar = async (req, res) => {
    try {
        const { brand, model, year, price, description } = req.body;
        await Car.update(req.params.id, { brand, model, year, price, description });
        res.json({ message: 'Car updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateCarStatus = async (req, res) => {
    try {
        const { status } = req.body;
        await Car.updateStatus(req.params.id, status);
        res.json({ message: 'Car status updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteCar = async (req, res) => {
    try {
        await Car.delete(req.params.id);
        res.json({ message: 'Car deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createCar,
    getCars,
    getCarById,
    updateCar,
    updateCarStatus,
    deleteCar
};
