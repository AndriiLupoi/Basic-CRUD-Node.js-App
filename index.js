const express = require('express');
const morgan = require('morgan');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const app = express();
const port = 3000;

const userRoutes = require('./user.routes');

app.use(express.json());
app.use(morgan('dev'));

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

app.use('/users', userRoutes);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || 'Внутрішня помилка сервера'
    });
});

app.listen(port, () => {
    console.log(`Сервер працює на http://localhost:${port}`);
    console.log(`Swagger доступний за адресою http://localhost:${port}/api-docs`);
});
