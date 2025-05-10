const User = require('./user.model');

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        next(err);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            const err = new Error('Користувача не знайдено');
            err.status = 404;
            return next(err);
        }
        res.json(user);
    } catch (err) {
        next(err);
    }
};

const createUser = async (req, res, next) => {
    try {
        const { name, age } = req.body;
        const newUser = new User({ name, age });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        next(err);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const { name, age } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, age },
            { new: true, runValidators: true }
        );
        if (!user) {
            const err = new Error('Користувача не знайдено');
            err.status = 404;
            return next(err);
        }
        res.json(user);
    } catch (err) {
        next(err);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            const err = new Error('Користувача не знайдено');
            err.status = 404;
            return next(err);
        }
        res.status(200).json({ message: 'Користувача видалено' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
