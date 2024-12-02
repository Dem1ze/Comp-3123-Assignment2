/**
 * @author: Carl Trinidad
 */

const Employee = require('../models/employee');

exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        if (!employees.length) {
            return res.status(404).json({ status: false, message: 'No employees found.' });
        }
        res.status(200).json({
            status: true,
            employees: employees.map(emp => ({
                id: emp._id,
                firstname: emp.firstname,
                lastname: emp.lastname,
                email: emp.email,
                position: emp.position,
                salary: emp.salary,
                dateOfJoining: emp.date_of_joining,
                department: emp.department
            }))
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch employees.', error: err.message });
    }
};

exports.createEmployee = async (req, res) => {
    const { firstname, lastname, email, position, salary, date_of_joining, department } = req.body;

    try {
        const existingEmployee = await Employee.findOne({ firstname, lastname, email });
        if (existingEmployee) {
            return res.status(400).json({ message: 'Employee already exists.', status: false });
        }

        const newEmployee = new Employee({ firstname, lastname, email, position, salary, date_of_joining, department });
        const savedEmployee = await newEmployee.save();
        res.status(201).json({ message: 'Employee created.', employeeId: savedEmployee._id, status: true });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create employee.', error: err.message });
    }
};

exports.getEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.eid);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found.', status: false });
        }
        res.status(200).json({ employee });
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving employee.', status: false });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const originalEmployee = await Employee.findById(req.params.eid);
        if (!originalEmployee) {
            return res.status(404).json({ message: 'Employee not found.', status: false });
        }

        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });

        const changes = {};
        for (const key in req.body) {
            if (originalEmployee[key] !== updatedEmployee[key]) {
                changes[key] = {
                    before: originalEmployee[key],
                    after: updatedEmployee[key]
                };
            }
        }

        res.status(200).json({ message: 'Employee updated.', changes, updatedEmployee });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update employee.', error: err.message, status: false });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found.', status: false });
        }

        await Employee.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Employee deleted.', deletedEmployee: employee });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete employee.', error: err.message, status: false });
    }
};

exports.searchEmployees = async (req, res) => {
    const { department, position } = req.query;

    try {
        const query = {};
        if (department) query.department = department;
        if (position) query.position = position;

        const employees = await Employee.find(query);
        if (!employees.length) {
            return res.status(404).json({ message: 'No matching employees found.', status: false });
        }

        res.status(200).json({ status: true, employees });
    } catch (err) {
        res.status(500).json({ message: 'Failed to search employees.', error: err.message, status: false });
    }
};



