/**
 * @author: Carl Trinidad
 */

const express = require('express');
const { signup, login } = require('../controllers/controller_user');
const { check } = require('express-validator');

const router = express.Router();

router.post('/signup', [
    check('username', 'Username is required').notEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').isLength({ min: 3 })
], signup);

router.post('/login', [
    check('username', 'Username is required').notEmpty(),
    check('password', 'Password is required').notEmpty()
], login);

module.exports = router;
