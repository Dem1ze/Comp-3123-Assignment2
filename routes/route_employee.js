/**
 * @author: Carl Trinidad
 */

const express = require('express');
const authenticate = require('../middleware/auth');
const { getEmployees, createEmployee, getEmployee, updateEmployee, deleteEmployee, searchEmployees } = require('../controllers/controller_employee');

const router = express.Router();

router.get('/employees', authenticate, getEmployees);
router.post('/employees', authenticate, createEmployee);
router.get('/employees/:eid', authenticate, getEmployee);
router.put('/employees/:eid', authenticate, updateEmployee);
router.delete('/employees/:id', authenticate, deleteEmployee);
router.get('/search', authenticate, searchEmployees);

module.exports = router;
