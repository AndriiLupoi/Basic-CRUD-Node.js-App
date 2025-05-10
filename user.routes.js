const express = require('express');
const userController = require('./user.controller');

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Отримати список користувачів
 *     responses:
 *       200:
 *         description: Список користувачів
 */
router.get('/', userController.getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Отримати користувача за ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 662edebc5d327c3b76fb7a26
 *     responses:
 *       200:
 *         description: Користувач знайдений
 *       404:
 *         description: Користувач не знайдений
 */
router.get('/:id', userController.getUserById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Створити нового користувача
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Ім'я користувача
 *               age:
 *                 type: integer
 *                 description: Вік користувача
 *     responses:
 *       201:
 *         description: Користувач створений
 */
router.post('/', userController.createUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Оновити користувача
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 662edebc5d327c3b76fb7a26
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Ім'я користувача
 *               age:
 *                 type: integer
 *                 description: Вік користувача
 *     responses:
 *       200:
 *         description: Користувач оновлений
 *       404:
 *         description: Користувач не знайдений
 */
router.put('/:id', userController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Видалити користувача
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 662edebc5d327c3b76fb7a26
 *     responses:
 *       200:
 *         description: Користувач видалений
 *       404:
 *         description: Користувач не знайдений
 */
router.delete('/:id', userController.deleteUser);

module.exports = router;
