/**
 * @author: Carl Trinidad
 */

const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    position: { 
        type: String, 
        required: true 
    },            

    salary: { 
        type: Number, 
        required: true 
    },  
               
    date_of_joining: { 
        type: Date, 
        required: true 
    },    

    department: { 
        type: String, 
        required: true 
    },        

    created: { 
        type: Date, 
        default: Date.now 
    },    

    updated: { 
        type: Date, 
        default: Date.now 
    } 
});

employeeSchema.pre('findOneAndUpdate', function(next) {
    this.set({ updated_at: Date.now() });
    next();
});

module.exports = mongoose.model('Employee', employeeSchema, 'employee_collection');
