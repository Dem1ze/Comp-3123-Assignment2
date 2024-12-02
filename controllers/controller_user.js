/**
 * @author: Carl Trinidad
 */

const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
require('dotenv').config();
const secretKey = process.env.JWT_SECRET;

exports.signup = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ message: errors.array(), status: false });
    }

    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.', status: false });
        }

        const newUser = new User({ username, email, password });
        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User created.', userId: savedUser._id, status: true });
    } catch (err) {
        res.status(500).json({ message: 'User creation failed.', error: err.message, status: false });
    }
};

exports.login = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array(), status: false });
    }

    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(401).json({ message: 'Invalid username or user not found.', status: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
        const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '3h' });
        res.status(200).json({ message: 'Login successful.', status: true, token });
    } else {
        res.status(401).json({ message: 'Invalid password.', status: false });
    }
};
