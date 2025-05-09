const users = [
    { id: 1, name: 'Іван', age: 25 },
    { id: 2, name: 'Марія', age: 30 },
    { id: 3, name: 'Олександр', age: 28 }
];

const getUsers = (req, res) => {
    res.json(users);
};

const getUserById = (req, res, next) => {

    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    
    if (user) {
        res.json(user);
    } else {
        const err = new Error('Користувача не знайдено');
        err.status = 404;
        next(err);
    }
};

const createUser = (req, res) => {
    const { name, age } = req.body;

    const newUser = {
        id: users.length + 1,
        name,
        age
    };

    users.push(newUser);
    res.status(201).json(newUser);
};

const updateUser = (req, res, next) => {
    const userId = parseInt(req.params.id);
    const { name, age } = req.body;

    const user = users.find(u => u.id === userId);
    
    if (!user) {
        const err = new Error('Користувача не знайдено');
        err.status = 404;
        return next(err);
    }

    user.name = name || user.name;
    user.age = age || user.age;

    res.json(user);
};

const deleteUser = (req, res, next) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        const err = new Error('Користувача не знайдено');
        err.status = 404;
        return next(err);
    }

    users.splice(userIndex, 1);
    res.status(200).json({ message: 'Користувача видалено' });
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
