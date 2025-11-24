const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(morgan('dev'));

// JWT Validation Middleware
const validateToken = (req, res, next) => {
    const publicPaths = [
        '/auth/register',
        '/auth/login',
        '/cars'
    ];

    if (publicPaths.some(path => req.path.startsWith(path))) {
        if (req.path === '/auth/profile') {
            // profile cần check token
        } else {
            return next();
        }
    }

    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        req.headers['x-user-id'] = decoded.id;
        req.headers['x-user-role'] = decoded.role;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

app.use(validateToken);

// --- SỬA LẠI PHẦN NÀY ---

// 1. Auth Service: Cắt bỏ '/auth' -> gửi '/register'
app.use('/auth', createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/auth': '' }
}));

// 2. Car Service: Giữ nguyên '/cars' vì service này đã config nhận '/cars'
app.use('/cars', createProxyMiddleware({
    target: process.env.CAR_SERVICE_URL,
    changeOrigin: true
}));

// 3. Order Service: Giữ nguyên '/orders' vì service này đã config nhận '/orders'
app.use('/orders', createProxyMiddleware({
    target: process.env.ORDER_SERVICE_URL,
    changeOrigin: true
}));

// 4. Payment Service: Cắt bỏ '/payment' -> gửi '/pay'
app.use('/payment', createProxyMiddleware({
    target: process.env.PAYMENT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/payment': '' }
}));

app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});