/**
 * @author: Carl Trinidad
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
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

// BEFORE SAVING IT ON OUR DATABASE,
// HASH THE PASSWORD OF OUR USER.
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        try {
            this.password = await bcrypt.hash(this.password, 12);
        } catch (error) {
            return next(error);
        }
    }
    next();
});

userSchema.pre('findOneAndUpdate', function(next){
    this.set({ updated: Date.now() });
    next();
});

module.exports = mongoose.model('User', userSchema, 'users_collection');