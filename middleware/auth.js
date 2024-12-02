/**
 * @author: Carl Trinidad
 */
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;
require('dotenv').config();

const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).send({ message: 'No token provided. Access denied.' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(400).send({ message: 'Token is invalid.' });
    }
};

module.exports = authenticate;
