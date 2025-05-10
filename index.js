const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const userRoutes = require('./user.routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));

// Підключення до MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ Підключено до MongoDB'))
.catch(err => console.error('❌ Помилка підключення до MongoDB:', err));

// Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Users API',
            version: '1.0.0',
            description: 'API для отримання інформації про користувачів'
        }
    },
    apis: [path.join(__dirname, 'user.routes.js')]
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Роути
app.use('/users', userRoutes);

// Обробка помилок
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || 'Внутрішня помилка сервера'
    });
});

app.listen(port, () => {
    console.log(`🚀 Сервер працює на http://localhost:${port}`);
    console.log(`📘 Swagger: http://localhost:${port}/api-docs`);
});
