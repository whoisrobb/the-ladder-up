const db = require("../models");
const jwt = require("jsonwebtoken");
const User = db.User;
const { Op } = require('sequelize');
// const { loadData } = require('./utils');


/* GET ALL USERS */
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* CREATE USER */
const createUser = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;

        const newUser = await User.create({
            FirstName: firstName,
            LastName: lastName,
            Username: username,
            Email: email,
            Password: password
        });

        const userId = newUser.UserID

        const token = jwt.sign(
            {
                userId: userId,
                username: newUser.Username,
                email: newUser.Email
            },
            process.env.JWT_SECRET
        );

        // loadData(userId);

        res.status(201).json({ message: 'Success!', token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

/* LOGIN USER */
const loginUser = async (req, res) => {
    try {
        const { value, password } = req.body;

        // Check for user using both username and email
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { Username: value },
                    { Email: value },
                ],
            },
        });

        if (!user) {
            return res.status(404).json({ message: 'Invalid User!' });
        };

        const isMatch = await user.isValidPassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials!' });
        };

        const token = jwt.sign(
            {
                userId: user.UserID,
                username: user.Username,
                email: user.Email
            },
            process.env.JWT_SECRET
        );

        res.status(200).json({ message: 'Success!', token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


module.exports = {
    getAllUsers,
    createUser,
    loginUser,
};