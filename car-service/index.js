const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const carRoutes = require('./routes/carRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/cars', carRoutes);

app.listen(PORT, () => {
    console.log(`Car Service running on port ${PORT}`);
});
